export const animateBtn = () => {
  
    const plusBtn = document.getElementById('plus-btn');
    const duration = 400
    if (plusBtn) {
        plusBtn.animate([
            {transform: 'scale(1)'},
            {transform: 'scale(0.2)'}
        ], {
            duration: duration / 2,
            iterations: 1,
            easing: 'ease-in-out'
        });

        setTimeout(() => {
            plusBtn.classList.remove('fa-floppy-disk');
            plusBtn.classList.add('fa-check');

            plusBtn.animate([
                {transform: 'scale(0.2)'},
                {transform: 'scale(1)'}
            ], {
                duration: duration / 2,
                iterations: 1,
                easing: 'ease-in-out'
            });
        }, duration / 2);

        setTimeout(() => {

            plusBtn.animate([
                {transform: 'scale(1)'},
                {transform: 'scale(0.2)'}
            ], {
                duration: duration / 2,
                iterations: 1,
                easing: 'ease-in-out'
            });

            setTimeout(() => {
                plusBtn.classList.remove('fa-check');
                plusBtn.classList.add('fa-floppy-disk');

                plusBtn.animate([
                    {transform: 'scale(0.2)'},
                    {transform: 'scale(1)'}
                ], {
                    duration: duration / 2,
                    iterations: 1,
                    easing: 'ease-in-out'
                });
            }, duration / 2);

            
        }, duration);
    }

}