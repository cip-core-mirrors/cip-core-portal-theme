
window.addEventListener('load', function(){
    
    const toggleBtns = document.getElementsByClassName('menu-block-link')

    for (const btn of toggleBtns) {

        btn.addEventListener('click', toggleClass, false)
    }

    function toggleClass(e) {

        e.preventDefault();

        if(e.currentTarget && e.currentTarget.parentNode){

            var child = e.currentTarget.parentNode.querySelector("ul");

            if(child && child.classList.contains('d-none'))

                child.classList.remove('d-none')

            else if (child){

                child.classList.add('d-none')
            }
        }
    }
});

