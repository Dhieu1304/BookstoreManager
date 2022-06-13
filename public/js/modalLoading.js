function showModalIsLoading(id) {
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

    document.getElementById(id).innerHTML = el;
}

function removeModalIsLoading() {
    let el = document.getElementById("modal-is-loading-custom");
    if (el) {
        el.remove();
    }
}
