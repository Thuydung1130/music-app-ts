//permissions
//console.log("ok")
const tablePermissions=document.querySelector("[table-permissions]");
//console.log(tablePermissions);
if(tablePermissions){
    const buttonSubmit=document.querySelector("[button-submit]");
    buttonSubmit.addEventListener("click",()=>{
        let permission=[];
        const rows=tablePermissions.querySelectorAll("[data-name]");
        //console.log(rows);

        rows.forEach(row=>{
            const name=row.getAttribute("data-name");
            const inputs=row.querySelectorAll("input");
            //console.log(inputs);
            if(name=="id"){
                inputs.forEach(input=>{
                    const id=input.value
                    permission.push({
                        id:id,
                        permission:[]
                    });
                })
            }
            else{
                inputs.forEach((input,index)=>{
                    const checked=input.checked;
                    if(checked){
                        permission[index].permission.push(name);
                    }                   
                });
            }
        });
        console.log(permission);
        if(permission.length>0){
            const formChangePermissions=document.querySelector("#form-change-permissions");
            const inputPermissions=formChangePermissions.querySelector("input[name='permissions']");
            inputPermissions.value=JSON.stringify(permission);
            formChangePermissions.submit();
        }
    })
}
//permissions

//permission data default
const dataRecords= document.querySelector("[data-records]");
if(dataRecords){
    const records=JSON.parse(dataRecords.getAttribute("data-records"));
    const tablePermissions=document.querySelector("[table-permissions]");
    records.forEach((record,index)=>{
        const permissions=record.permissions;
        permissions.forEach(permission=>{
            const row=tablePermissions.querySelector(`[data-name="${permission}"]`);
            const input=row.querySelectorAll("input")[index];
            input.checked=true;
        })
    })
}
//permission data default


//disable input
// Giả sử bạn đã render sẵn quyền vào JS bằng Pug


// Nếu không có quyền sửa thì disable tất cả các checkbox
if (!hasEditPermission) {
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        cb.disabled = true;
    });

    // Cũng ẩn luôn nút "Cập nhật" nếu cần
    const updateButton = document.querySelector('button[button-submit]');
    if (updateButton) {
        updateButton.style.display = 'none';
    }
}

//disable input
