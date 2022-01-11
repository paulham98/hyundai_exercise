<template>
    <div id="app">
    <header class="site-header">
        <nav class="navbar navbar-expand-md navbar-dark bg-steel fixed-top">
            <div class="container">
                <a class="navbar-brand mr-4" href="/">Vue Blog</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggle" aria-controls="navbarToggle" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarToggle">
                    <div class="navbar-nav mr-auto">
                        <a class="nav-item nav-link" href="/admin1">로봇 가동 현황</a>
                        <a class="nav-item nav-link" href="/about">라인 상세 화면</a>
                        <a class="nav-item nav-link" href="/sebu">세부항목</a>
                        <a class="nav-item nav-link" href="/Popup">실시간 팝업</a>
                        <a class="nav-item nav-link" href="/Robot">로봇용접</a>
                        <a class="nav-item nav-link" href="/Manual">수동용접</a>
                        <a class="nav-item nav-link" href="/List">리스트</a>
                    </div>
                    <!-- Navbar Right Side -->
                    <div class="navbar-nav">
                        <a class="nav-item nav-link" href="/Realtime">실시간 상태</a>
                    </div>
                </div>
            </div>
        </nav>
    </header>
    </div>
</template>

<script>
    export default {
        name: "layout",
    }
</script>

<style scoped>
    body {
        background: #fafafa;
        color: #333333;
        margin-top: 5rem;
    }

    h1, h2, h3, h4, h5, h6 {
        color: #444444;
    }

    .bg-steel {
        background-color: #5f788a;
    }

    .site-header .navbar-nav .nav-link {
        color: #cbd5db;
    }

    .site-header .navbar-nav .nav-link:hover {
        color: #ffffff;
    }

    .site-header .navbar-nav .nav-link.active {
        font-weight: 500;
    }

    .content-section {
        background: #ffffff;
        padding: 10px 20px;
        border: 1px solid #dddddd;
        border-radius: 3px;
        margin-bottom: 20px;
    }

    .article-title {
        color: #444444;
    }

    a.article-title:hover {
        color: #428bca;
        text-decoration: none;
    }

    .article-content {
        white-space: pre-line;
    }

    .article-img {
        height: 65px;
        width: 65px;
        margin-right: 16px;
    }

    .article-metadata {
        padding-bottom: 1px;
        margin-bottom: 4px;
        border-bottom: 1px solid #e3e3e3
    }

    .article-metadata a:hover {
        color: #333;
        text-decoration: none;
    }

    .article-svg {
        width: 25px;
        height: 25px;
        vertical-align: middle;
    }

    .account-img {
        height: 125px;
        width: 125px;
        margin-right: 20px;
        margin-bottom: 16px;
    }

    .account-heading {
        font-size: 2.5rem;
    }

</style>