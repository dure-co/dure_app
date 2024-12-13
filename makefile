
.PHONY: build help

help:
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: ## package.json ## Install dependencies \
	wget https://github.com/nektos/act/releases/download/v0.2.69/act_Linux_x86_64.tar.gz
	
	pnpm install

build: ## Build the app
	pnpm run build:app

test: ## Run tests
	pnpm run test

clear: ## clear container
	yes|docker ps -a|grep act-dure|cut -d" " -f1|xargs docker stop || true
	yes|docker ps -a|grep act-dure|cut -d" " -f1|xargs docker rm || true
	yes|docker image prune

# prerequisite docker, docker compose, act(github workflow local runner)
tauri2-release: ## build tauri by running github workflow	\
	# yes|docker ps -a|grep act-dure-tauri2-release|cut -d" " -f1|xargs docker stop || true \
	# yes|docker ps -a|grep act-dure-tauri2-release|cut -d" " -f1|xargs docker rm || true \
	# yes|docker image prune \
	# rm -rf .out/tauri && mkdir -p .out
	act -v -W ./.github/workflows/tauri2-build-release.yml || true
	bash -c "docker cp "$(docker ps -a|grep act-dure-tauri2-release|cut -d' ' -f1)":$(pwd)/packages/dure_app/_tauri/target ./.out/tauri" || true

tauri2-debug: ## build tauri by running github workflow	\
	# yes|docker ps -a|grep act-dure-tauri2-debug|cut -d" " -f1|xargs docker stop || true \
	# yes|docker ps -a|grep act-dure-tauri2-debug|cut -d" " -f1|xargs docker rm || true \
	# yes|docker image prune \
	# rm -rf .out/tauri && mkdir -p .out
	act -v -W ./.github/workflows/tauri2-build-debug.yml || true
	bash -c "docker cp "$(docker ps -a|grep act-dure-tauri2-debug|cut -d' ' -f1)":$(pwd)/packages/dure_app/_tauri/target ./.out/tauri" || true

# capa-and: ## build capacitor for android by running github workflow	
# 	yes|docker ps -a|grep act-dure-capacitor-android|cut -d" " -f1|xargs docker stop || true
# 	yes|docker ps -a|grep act-dure-capacitor-android|cut -d" " -f1|xargs docker rm || true
# 	yes|docker image prune
# 	act -v -W ./.github/workflows/capacitor-android-build.yml || true
# 	rm -rf .out/capa-and && mkdir -p .out
# 	bash -c "docker cp "$(docker ps -a|grep act-dure-capacitor-android|cut -d' ' -f1)":$(pwd)/packages/dure_app/android/app/build/outputs ./.out/capa-and" || true

# capa-ios: # not tested
# # act -v -W ./.github/workflows/capacitor-ios-build.yml 2>1

kivy-and: ## build kivy for android by running github workflow	
	yes|docker ps -a|grep act-dure-kivy-android|cut -d" " -f1|xargs docker stop || true
	yes|docker ps -a|grep act-dure-kivy-android|cut -d" " -f1|xargs docker rm || true
	yes|docker image prune
	act -v -W ./.github/workflows/kivy-android-build.yml || true
	rm -rf .out/kivy-and && mkdir -p .out
	bash -c "docker cp "$(docker ps -a|grep act-dure-kivy-android|cut -d' ' -f1)":$(pwd)/packages/dure_app/_kivy/.buildozer/android/platform/build-arm64-v8a_armeabi-v7a/dists/pywebviewTodos/build/outputs/apk/debug ./.out/kivy-and" || true

kivy-ios: # not tested
#	act -v -W ./.github/workflows/kivy-ios-build.yml -P macos-latest=sickcodes/docker-osx:sonoma 2>1

# act -v -W ./.github/workflows/kivy-ios-build.yml -P macos-latest=sickcodes/docker-osx:sonoma
# working osx on docker
# docker run -it \
#   --device /dev/kvm \
#   -p 50922:10022 \
#   -v /tmp/.X11-unix:/tmp/.X11-unix \
#   -e "DISPLAY=${DISPLAY:-:0.0}" \
#   -e GENERATE_UNIQUE=true \
#   -e CPU='Haswell-noTSX' \
#   -e CPUID_FLAGS='kvm=on,vendor=GenuineIntel,+invtsc,vmware-cpuid-freq=on' \
#   -e MASTER_PLIST_URL='https://raw.githubusercontent.com/sickcodes/osx-serial-generator/master/config-custom-sonoma.plist' \
#   sickcodes/docker-osx:sonoma