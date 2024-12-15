//Expand collapse of sidebar
document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggle-btn');
    const mainContent = document.getElementById('main-content');
    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        sidebar.classList.toggle('expanded');

        if (sidebar.classList.contains('collapsed')) {
            mainContent.style.marginLeft = '4rem';
            toggleBtn.classList.add('collapsed');
        }
        else {
            mainContent.style.marginLeft = '16rem';
            toggleBtn.classList.remove('collapsed');
            toggleBtn.classList.add('expanded');
        }
    });
});