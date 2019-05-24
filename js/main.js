$(document).ready(function(){
  let locate=[];
  let data=[]; 
  $.ajax({
    type: "GET",
  url: 'https://api.kcg.gov.tw/api/service/Get/e94fbcd3-b644-403b-8da2-d09dec39f67d',
  dataType: 'json',
  success: function(getData) {
    //先將 data 的行政區丟到 locate array 中
    
    for (let i = 0; i< getData.data.data.length; i++ ){
      data.push(getData.data.data[i]);
      locate.push(getData.data.data[i].行政區);
    }
    //再來要把重複的元素刪除，重新更改原陣列
    locate = locate.filter(function(element, index, array){
      return array.indexOf(element) === index;
    });
    //console.log(data[1]);
    //把行政區放到<select>中 
    let str = ``;
    const firstSelect = `<option selected disabled> ---  請選擇行政區 --- </option>`;
    for(let i = 0; i<locate.length; i++){
      str +=`<option value = "${locate[i]}">${locate[i]}</option>`;
    }
    $('#locateSelect').append(firstSelect+str);
    //console.log(locate);

    // 產生4個隨機行政區按鈕
    let randomArray=[];
    const btnClass = ["btn btn-primary", "btn btn-success", "btn btn-warning", "btn btn-info"];
    let btnstr = ``;
    for(let i = 0; i<4; i++){
      for(let j = 0; j<4; j++){
        randomArray[j] = Math.floor(Math.random()*(locate.length));
      }
      btnstr += `<button value="${locate[randomArray[i]]}" class="${btnClass[i]}">${locate[randomArray[i]]}</button>`
    }

    $('.hot-button').find('*').remove();
    $('.hot-button').append(btnstr);
    // console.log(btnstr);
    // console.log(randomArray);

    $('.btn').on({
      click: function(e){
        e.preventDefault();
        $('.data-list').find('*').remove();
        let temp = $(this).val();
        $('.locateName').html(temp);
        let str=``;
        for(let i = 0; i<getData.data.data.length; i++){
          if(temp === getData.data.data[i].行政區){
            str +=`<li class="list mb-5 col-12 col-sm-6 col-md-4"><div>
                    <p><span>營業主體: </span>${getData.data.data[i].營業主體}</p>
                    <p><span>站名: </span>${getData.data.data[i].站名}</p>
                    <p><span>行政區: </span>${getData.data.data[i].行政區}</p>
                    <p><span>站址: </span><a href="https://www.google.com.tw/maps/place/${getData.data.data[i].站址}" target="_blank">${getData.data.data[i].站址}</a></p>
                    <p><span>電話號碼: </span>${getData.data.data[i].電話號碼}</p>
                  </div></li>`
          }
        }
        $('.data-list').append(str);
      }
    });

    $('#locateSelect').on({
      change: function(e){
        e.preventDefault();
        $('.data-list').find('*').remove();
        let temp = $(this).val();
        $('.locateName').html(temp);
        let str=``;
        for(let i = 0; i<getData.data.data.length; i++){
          if(temp === getData.data.data[i].行政區){
            str +=`<li class="list mb-5 col-12 col-sm-6 col-md-4"><div>
                    <p><span>營業主體: </span>${getData.data.data[i].營業主體}</p>
                    <p><span>站名: </span>${getData.data.data[i].站名}</p>
                    <p><span>行政區: </span>${getData.data.data[i].行政區}</p>
                    <p><span>站址: </span>${getData.data.data[i].站址}</p>
                    <p><span>電話號碼: </span>${getData.data.data[i].電話號碼}</p>
                  </div></li>`
          }
        }
        $('.data-list').append(str);
        //console.log(temp);
      }
    });
  }
  });
});
