//格式代银行卡号
function formatBC(e){
 
            $(this).attr("data-oral", $(this).val().replace(/\ +/g,""));
            //$("#bankCard").attr("data-oral")获取未格式化的卡号
 
            var self = $.trim(e.target.value);
            var temp = this.value.replace(/\D/g, '').replace(/(....)(?=.)/g, '$1 ');
            if(self.length > 22){
                this.value = self.substr(0, 22);
                return this.value;
            }
            if(temp != this.value){
                this.value = temp;
            }
}

function formatMN(e){
            this.value = this.value.replace(/[^\d\.\-]/g,"");
            $(this).attr("data-oral", parseFloat(e.target.value.replace(/[^\d\.-]/g, "")));
            //$("#moneyNum").attr("data-oral")获取未格式化的金额
}