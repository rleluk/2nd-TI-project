function setVisibleNav(currentNav) {
    const navs = document.querySelectorAll('.nav-bar a.nav-item');

    for (let nav of navs) 
        nav.classList.remove('active-nav');

    currentNav.classList.add('active-nav');
}

