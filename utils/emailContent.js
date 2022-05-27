
module.exports.content = (fullName, link) => {
    return `<!DOCTYPE html>
    <html>
    <head>
    <title>EmailVerify</title>
    <style type="text/css" rel="stylesheet" media="all">
        .full-email {
        max-width: 600px;
        width: 80%;
        padding-right: var(--bs-gutter-x, 0.75rem);
        padding-left: var(--bs-gutter-x, 0.75rem);
        margin-right: auto;
        margin-left: auto;
        height: 100vh;
    }

        .title-header {
        height: 20%;
        background: aquamarine;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
    }

        .title-header h1 {
        margin: auto;
        font-family: fantasy;
        font-weight: bold;
    }

        .btn-verify {
        display: flex;
        padding: 15px;
    }

        .btn-verify a{
        font-weight: 600;
        color: white;
        margin: 0 auto;
        padding: 7px;
        background: #3f479b;
        text-decoration: none;
    }

        div {
        margin-top: 5px;
    }

        .link-style {
        margin: 10px 0 10px 0;
        color: #0a53be;
        font-style: italic;
    }

        .footer {
        margin-top: 20px;
    }
    </style>
    </head>

    <body>
    <div class="full-email">
        <div class="title-header">
            <h1>BookStore</h1>
        </div>
        <div class="">
            Hi ${fullName},
        </div>
        <div>
            <div>
                There was recently a request to change the password on your account. If you requested this password change,
                please click the link below to set a new password:
            </div>
            <div class="btn-verify">
                <a href="${link}" target="_blank"> Click here to change your password </a>
            </div>
            <div>If the button above is not working, paste this link below into your browser:</div>
            <div class="link-style">${link}</div>
            <div>If you don't want to change your password, just ignore this message.</div>
            <div>
                Thank you.
            </div>
            <div>
                -The BookStore Team
            </div>

            <div class="footer">
                <hr/>
                <div class="">Copyright © Book Store Manager - TKPM 2022</div>
            </div>
        </div>
    </div>
    </body>
    </html>`
}
