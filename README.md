# Notes (React + Vite + Capacitor)

Offline note-taking app: add notes, mark them completed, delete, sort. Notes are saved on the device.

## Develop
    npm install
    npm run dev        # browser
    npm test           # automated tests
    npm run lint

## Android
Requirements: Node 22+, JDK 21, Android Studio (or Android SDK).

    npm run cap:sync   # build web + copy into android/
    npm run android:open   # opens Android Studio -> Run on device/emulator

Command-line debug APK:

    cd android && ./gradlew assembleDebug
    # output: android/app/build/outputs/apk/debug/app-debug.apk

No local setup? Push to GitHub and run the "Build Android APK" workflow;
download `notes-debug-apk` from the run's artifacts.

Install: copy the APK to the phone, allow "install unknown apps", open it.

## Before publishing
- Change `appId` in `capacitor.config.json` (and rebuild) to your own, e.g. `com.yourname.notes`.
- Create a signing keystore and build a signed release / AAB (`./gradlew bundleRelease`). Never commit the keystore or passwords.
- Replace `resources/icon*.png`, then run `npx capacitor-assets generate --android`.
