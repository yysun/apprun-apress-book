$.ajaxSetup({ cache: false });
const get = url => new Promise((resolve, reject) => {
    $.getJSON(url)
        .then(d => resolve(d))
        .fail(e => reject(e))
})

window.addEventListener('popstate', (e) => {
    const path = document.location.pathname;
    app.run('/', path);
});

$('.navbar-nav li a').on('click', function (event) {
    event.preventDefault();
    $('.navbar-nav li a').removeClass('active');
    const menu = $(this).addClass('active')[0];
    history.pushState(null, '', menu.href);
    app.run('/', menu.pathname);
});

const view = (state) => state;

const update = {
    '/': async (_, path) => {
        const json = await get(path);
        return json;
    }
};

app.start('my-app', null, view, update);