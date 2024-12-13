// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
// #[tauri::command]
// fn greet(name: &str) -> String {
//     format!("Hello, {}! You've been greeted from Rust!", name)
// }

// #[cfg_attr(mobile, tauri::mobile_entry_point)]
// pub fn run() {
//     tauri::Builder::default()
//         .plugin(tauri_plugin_shell::init())
//         .invoke_handler(tauri::generate_handler![greet])
//         .run(tauri::generate_context!())
//         .expect("error while running tauri application");
// }

use tauri_plugin_log::{Target, TargetKind};
// use tauri::Manager;
// use argon2::{hash_raw, Config, Variant, Version};
// use argon2::{ Config, ThreadMode, Variant, Version, hash_raw };

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let builder = tauri::Builder::default();
    builder
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_log::Builder::new().targets([
            Target::new(TargetKind::Stdout),
            Target::new(TargetKind::LogDir { file_name: None }),
            Target::new(TargetKind::Webview),
        ]).build())
        .plugin(tauri_plugin_notification::init())
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_store::Builder::default().build())
        .plugin(tauri_plugin_system_info::init())
        // .plugin(tauri_plugin_mqtt::init())
        // .plugin(
        //     tauri_plugin_stronghold::Builder::new(|password| {
        //         let config = Config {
        //             lanes: 4,
        //             mem_cost: 10_000,
        //             time_cost: 10,
        //             variant: Variant::Argon2id,
        //             version: Version::Version13,
        //             ..Default::default()
        //         };
        //         let salt = "your-salt".as_bytes();
        //         let key = hash_raw(password.as_ref(), salt, &config).expect("failed to hash password");

        //         key.to_vec()
        //     })
        //     .build(),
        // )
        // .setup(|app| {
        //     let salt_path = app
        //         .path()
        //         .app_local_data_dir()
        //         .expect("could not resolve app local data path")
        //         .join("salt.txt");
        //     app.handle().plugin(tauri_plugin_stronghold::Builder::with_argon2(&salt_path).build())?;
        //     Ok(())
        // })
        //.invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}


// #[cfg_attr(mobile, tauri::mobile_entry_point)]
// pub fn run() {
//     // #[cfg(debug_assertions)]
//     // {
//     //     log::info!("App started!");
//     //     log::warn!("Example Rust Log: warning!");
//     //     log::error!("Example Rust Log: error!");
//     // }

//     #[cfg(debug_assertions)]
//     let devtools = tauri_plugin_devtools::init();
//     let mut builder = tauri::Builder::default();

//     // let specta_builder = tauri_specta::Builder::<tauri::Wry>::new()
//     //     .commands(tauri_specta::collect_commands![greet])
//     //     .events(tauri_specta::collect_events![crate::DemoEvent]);

//     #[cfg(debug_assertions)]
//     {
//         builder = builder.plugin(devtools);
//     }

//     // #[cfg(all(debug_assertions, not(mobile)))]
//     // specta_builder
//     //     .export(
//     //         specta_typescript::Typescript::default()
//     //             .formatter(specta_typescript::formatter::prettier),
//     //         "../src/bindings.ts",
//     //     )
//     //     .expect("failed to export typescript bindings");

//     builder
//         .plugin(tauri_plugin_shell::init())
//         .plugin(tauri_plugin_dialog::init())
//         // .plugin(tauri_plugin_log::Builder::new().targets([
//         //     Target::new(TargetKind::Stdout),
//         //     Target::new(TargetKind::LogDir { file_name: None }),
//         //     Target::new(TargetKind::Webview),
//         // ]).build())
//         .plugin(tauri_plugin_notification::init())
//         .plugin(tauri_plugin_os::init())
//         // .invoke_handler(specta_builder.invoke_handler())
//         .setup(move |app| {
//             // specta_builder.mount_events(app);

//             // listen to demo event
//             // DemoEvent::listen(app, |event| {
//             //     log::info!("DemoEvent received in Rust:: {:?}", event.payload);
//             // });

//             // dispatch demo event
//             // DemoEvent("Hello from Rust 🦀".to_string()).emit(app).ok();
//             // /dispatch demo event

//             Ok(())
//         })
//         .run(tauri::generate_context!())
//         .expect("error while running tauri application");
// }

// tauri-log-plugin
// use tauri_plugin_log::{Target, TargetKind};
// fn main() {
//     tauri::Builder::default()
//         .plugin(tauri_plugin_log::Builder::new().targets([
//             Target::new(TargetKind::Stdout),
//             Target::new(TargetKind::LogDir { file_name: None }),
//             Target::new(TargetKind::Webview),
//         ]).build())
//         .run(tauri::generate_context!())
//         .expect("error while running tauri application");
// }

// tauri-notification-plguin
// fn main() {
//     tauri::Builder::default()
//         .plugin(tauri_plugin_notification::init())
//         .run(tauri::generate_context!())
//         .expect("error while running tauri application");
// }

// tauri-os-plugin
// fn main() {
//     tauri::Builder::default()
//         .plugin(tauri_plugin_os::init())
//         .run(tauri::generate_context!())
//         .expect("error while running tauri application");
// }

//tauri-shell-plugin
// fn main() {
//     tauri::Builder::default()
//         .plugin(tauri_plugin_shell::init())
//         .run(tauri::generate_context!())
//         .expect("error while running tauri application");
// }

// tauri-stronghole-plugin
// fn main() {
//     tauri::Builder::default()
//         .plugin(tauri_plugin_stronghold::Builder::new(|password| {
//             // Hash the password here with e.g. argon2, blake2b or any other secure algorithm
//             // Here is an example implementation using the `rust-argon2` crate for hashing the password

//             use argon2::{hash_raw, Config, Variant, Version};

//             let config = Config {
//                 lanes: 4,
//                 mem_cost: 10_000,
//                 time_cost: 10,
//                 variant: Variant::Argon2id,
//                 version: Version::Version13,
//                 ..Default::default()
//             };

//             let salt = "your-salt".as_bytes();

//             let key = hash_raw(password.as_ref(), salt, &config).expect("failed to hash password");

//             key.to_vec()
//         })
//         .build())
//         .run(tauri::generate_context!())
//         .expect("error while running tauri application");
// }
