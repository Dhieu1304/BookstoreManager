const getAPIData = () => {
    $.ajax({
        url: `/regulation/api/listRegulation`,
        type: 'get',
        success: function (res) {
            console.log('Data:', res);

            if (res.errCode !== 0) {
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
                    <td>
                        <input type="checkbox" ${regulation.is_used === true ? 'checked' : ''} onclick="return false;">
                    </td>
                </tr>
            `;
        })
    }

    document.getElementById('tbody-table-regulation').innerHTML = render;
    handleShowBtn(false);
}

const handleShowBtn = (isHidden = true) => {
    $('#btn-change').attr("hidden", isHidden);
    $('#btn-save').attr("hidden", !isHidden);
}

const handleChangeRegulationView = () => {
    $("table > tbody > tr").each(function () {
        $(this).find('td').eq(2).attr('contenteditable', 'true');
        $(this).find("td:eq(3) input[type='checkbox']").prop("onclick", null).off("click");
    });

    handleShowBtn();
}

const handleSaveRegulation = () => {
    let regulations = [];
    const regex = /^\d+$/;
    let isBreak = false;
    $("table > tbody > tr").each(function () {
        let regulation = {
            'id': $(this).find('td').eq(0).text().trim(),
            'value': $(this).find('td').eq(2).text().trim(),
            'is_used': $(this).find("td:eq(3) input[type='checkbox']").prop('checked')
        }
        if (!regex.test(regulation['value'])) {
            isBreak = true;
        }
        regulations.push(regulation);
    });

    if (isBreak) {
        return notification("Value Error!!!", NOTY_TYPE.FAIL);
    }

    console.log(regulations);

    $.ajax({
        url: `/regulation/api/editRegulation`,
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(regulations),
        success: function (res) {
            console.log('Data:', res);

            if (res.errCode !== 0) {
                notification(res.errMessage, NOTY_TYPE.FAIL);
            } else {
                notification(res.errMessage, NOTY_TYPE.SUCCESS);
                getAPIData();
            }
        }
    });
}
