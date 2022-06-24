const getAPIData = () => {
    $.ajax({
        url: `/regulation/api/listRegulation`,
        type: 'get',
        success: function (res) {
            console.log('Data:', res);

            if (res.errCode !== 0) {
                if (res.result === 'redirect') {
                    return window.location.replace(res.url);
                }
                notification(res.errMessage, NOTY_TYPE.FAIL);
            } else {
                handleRenderView(res.data);
            }
        }
    });
}

$(function () {
    getAPIData();
});

const handleRenderView = (regulations) => {

    let render = '';
    if (regulations && regulations.length > 0) {
        regulations.forEach((regulation) => {
            render += `
                <tr>
                    <td>
                        ${regulation.id}
                    </td>
                    <td>
                        ${regulation.name}
                    </td>
                    <td>
                        ${regulation.value}
                    </td>
                    <td style="text-align: center">
                        <input type="checkbox" ${regulation.is_used === true ? 'checked' : ''} onclick="return false;">
                    </td>
                    <td style="text-align: center">
                        <span class="edit-icon" onclick="handleShowModalEdit(${regulation.id})">
                            <i class="far fa-edit"></i>
                        </span>
                    </td>
                </tr>
            `;
        })
    }

    document.getElementById('tbody-table-regulation').innerHTML = render;
    // handleShowBtn(false);
}


const modalEdit = document.getElementById("modalEditRegulation");

let spanEl = document.getElementById("close-modal");
let closeBtn = document.getElementById("close-modal-btn");

spanEl.onclick = function () {
    modalEdit.style.display = "none";
}

closeBtn.onclick = function (event) {
    event.preventDefault();
    modalEdit.style.display = "none";
}

const handleShowModalEdit = (id) => {
    console.log(id);

    $.ajax({
        url: `/regulation/api/getRegulationById`,
        type: 'post',
        data: {id},
        success: function (res) {
            console.log('Data:', res.data);

            if (res.errCode !== 0) {
                notification(res.errMessage, NOTY_TYPE.FAIL);
            } else {
                handleRenderViewEditRegulationModal(res.data);
            }
        }
    });
}

const handleRenderViewEditRegulationModal = (regulation) => {
    $('#inputId').val(regulation.id);
    $('#name').val(regulation.name);
    $('#inputValue').val(regulation.value);
    $('#inputIsUsed').prop('checked', regulation.is_used);
    modalEdit.style.display = "block";
}

const handleEditRegulation = (event) => {
    event.preventDefault();

    let id = $('#inputId').val();
    let value = $('#inputValue').val();
    let is_used = $('#inputIsUsed').prop('checked');

    $.ajax({
        url: `/regulation/api/editRegulation`,
        type: 'post',
        data: {id, value, is_used},
        success: function (res) {

            if (res.errCode !== 0) {
                notification(res.errMessage, NOTY_TYPE.FAIL);
            } else {
                modalEdit.style.display = 'none';
                notification(res.errMessage, NOTY_TYPE.SUCCESS);
                getAPIData();
            }
        }
    })
}
