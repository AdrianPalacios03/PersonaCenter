const beforeInstallPromptEvent = (setIsReadyForInstall) => {
    window.addEventListener("beforeinstallprompt", (event) => {
        // Prevent the mini-infobar from appearing on mobile.
        event.preventDefault();
        console.log("👍", "beforeinstallprompt", event);
        // Stash the event so it can be triggered later.
        window.deferredPrompt = event;
        // Remove the 'hidden' class from the install button container.
        setIsReadyForInstall(true);
      });
}

export default beforeInstallPromptEvent;