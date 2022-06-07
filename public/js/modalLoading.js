function showModalIsLoading() {
    let modalStyle = `
    .modal-is-loading-custom {
        display: block;
        position: fixed;
        z-index: 10000;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgb(0,0,0);
        background-color: rgba(0,0,0,0.4);
    }
    
    .modal-body-is-loading-custom {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    `

    let el = `
    <div id="modal-is-loading-custom" class="modal-is-loading-custom">
        <div class="modal-sm" style="margin: 0 auto; margin-top: 40vh !important">
          <div class="modal-body-is-loading-custom">
        		<div class="spinner-border text-primary"  role="status">

        		</div>
                <div>
              	    <span>Loading...</span>
                </div>
          </div>
        </div>
    </div>
    `;

    document.head.appendChild(document.createElement("style")).innerHTML = modalStyle;

    let divEl = document.createElement("div");
    divEl.innerHTML = el;
    document.body.appendChild(divEl);
}

function removeModalIsLoading() {
    let el = document.getElementById("modal-is-loading-custom");
    if (el) {
        el.remove();
    }
}
