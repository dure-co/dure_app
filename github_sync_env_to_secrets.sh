#!/usr/bin/env bash
# Usage: ./create_action_secrets.sh
# DEFAULT_KEY: doest not sync to github secrets
EXCLUDE_KEYS=("EXCLUDE_SYNC")
# github.sh : github .env sync tool for githb workflow.
# workflow action reads env data from github user secrets
# .env -> github user secrets
# https://docs.github.com/en/rest/actions/secrets?apiVersion=2022-11-28

# Function to get the Repo Public Key
getUserPubkey() {
  URL="https://api.github.com/repos/${OWNER_NAME}/${REPO_NAME}/actions/secrets/public-key"
  # echo "Trying URL: ${URL}"

  response=$(curl -s -L \
    -H "Accept: application/vnd.github+json" \
    -H "Authorization: Bearer ${GITHUB_TOKEN}" \
    -H "X-GitHub-Api-Version: 2022-11-28" \
    "${URL}")
  echo $response
  # echo "Response: $response"

  # KEY=$(echo "$response" | jq -r '.key')
  # KEY_ID=$(echo "$response" | jq -r '.key_id')

  # echo "Owner/Repo Name: ${OWNER_REPO}"
  # echo "Key: ${KEY}"
  # echo "Key ID: ${KEY_ID}"
}

getListUserSecrets() {
  URL="https://api.github.com/repos/${OWNER_NAME}/${REPO_NAME}/actions/secrets"
  # echo "Trying URL: ${URL}"
  response=$(curl -s -L \
    -H "Accept: application/vnd.github+json" \
    -H "Authorization: Bearer ${GITHUB_TOKEN}" \
    -H "X-GitHub-Api-Version: 2022-11-28" \
    "${URL}")
  echo $response
  # echo "Response: $response"

  # KEY=$(echo "$response" | jq -r '.key')
  # KEY_ID=$(echo "$response" | jq -r '.key_id')

  # echo "Owner/Repo Name: ${OWNER_REPO}"
  # echo "Key: ${KEY}"
  # echo "Key ID: ${KEY_ID}"
}

# encode py file
createEncodePy() {
  tee .encodesecrets.py > /dev/null <<EOT
#!/usr/bin/python3

import sys
from base64 import b64encode
from nacl import encoding, public

def encrypt(public_key: str, secret_value: str) -> str:
  public_key = public.PublicKey(public_key.encode("utf-8"), encoding.Base64Encoder())
  sealed_box = public.SealedBox(public_key)

  encrypted = sealed_box.encrypt(secret_value.encode("utf-8"))
  return b64encode(encrypted).decode("utf-8")

print(encrypt(sys.argv[1], sys.argv[2]))
EOT
}
createEncodePy

source .env
response=$(getUserPubkey )
# echo $response
key=$(echo "$response" | jq -r '.key')
key_id=$(echo "$response" | jq -r '.key_id')
# echo $key
# echo $key_id

env_text=$(cat .env | sed -e 's/ # .*$//g')
while IFS= read -r line
do
  IFS=$'\n' read -d "" -ra tmp <<< "${line//=/$'\n'}" # split
  [[ 2 -ne "${#tmp[@]}" ]] && continue
  env_key="${tmp[0]}" && env_val="${tmp[1]}"
  [[ ${EXCLUDE_KEYS[*]} =~ $env_key ]] && continue
  [[ ${EXCLUDE_SYNC[*]} =~ $env_key ]] && continue

  encrypted_value=$(python3 .encodesecrets.py $key $env_val)
  CREATE_SECRET_EP="https://api.github.com/repos/${OWNER_NAME}/${REPO_NAME}/actions/secrets/$env_key"
  response=$(curl -s --location --request PUT "$CREATE_SECRET_EP" \
    --header "Authorization: Bearer $GITHUB_TOKEN" \
    --header "Content-Type: application/json" \
    --data-raw "{\"key_id\": \"$key_id\",\"encrypted_value\":\"$encrypted_value\"}")
  echo $response
done <<< "$env_text"

echo "Updated Secrets"
getListUserSecrets

rm -rf .encodesecrets.py
