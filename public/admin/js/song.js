// Delete item
const buttonDelete=document.querySelectorAll("[button-delete]");
console.log("ok")
if(buttonDelete.length>0){
    const formDeleteItem=document.querySelector("#form-delete-item");
    const path=formDeleteItem.getAttribute("data-path");
    buttonDelete.forEach(button=>{
        button.addEventListener("click",()=>{
            //e.preventDefault(); // 🧨 Không có cái này là form submit mặc định (GET)
            const isConfirm=confirm("Bạn chắc chắn muốn xóa");
            if(isConfirm){
                const id=button.getAttribute("data-id");
                //console.log(id);
                const action=  `${path}/${id}?_method=DELETE`;
                
                formDeleteItem.action=action;
                console.log(formDeleteItem)
                formDeleteItem.submit();
            }
        })
    })
}
// Delete item