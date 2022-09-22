
window.addEventListener("DOMContentLoaded", () => {
    const openmodalbutton = document.querySelector('[data-modal-target]')
    let closemodalbutton = document.querySelector('[data-close-button]')
    tbl = document.querySelector("#tbl")
    const overlay = document.getElementById('overlay');
    const search = document.querySelector("#searchvehicle");
    const filter = document.querySelector("#filter")
    let fselect = document.querySelector("#float-select")
    filter.addEventListener('click',()=>{
        const ddown = document.querySelector(".float-dropdown")
        ddown.classList.toggle('active');
        if(ddown.classList.contains('active')){
            let vlist = app.getVehicleData();
            vlist = vlist.map(val=>val['tname']);
            vlist = new Set(vlist)
            vlist.forEach((val)=>{
                let op = document.createElement("option")
                op.value = val
                op.innerHTML = val
                fselect.appendChild(op);
            })
        }
    })

    fselect.addEventListener('change',(e)=>{
        let inp=e.target.value;
        let vlist = app.getVehicleData();
        if(inp != ""){
           vlist = vlist.filter((val)=>val['tname']==inp);
           updateVehicleList(vlist); 
        }else{
            updateVehicleList(vlist);
        }
    })
    search.addEventListener('input',(e)=>{
       let vlist = app.getVehicleData();
       vlist = vlist.filter((val)=>{
        if(val){
            return val["vnumber"]==e.target.value;
        }
        return false;
       })
       updateVehicleList(vlist);
    })
    function updateVehicleList(vlist){
        let tbody = tbl.firstElementChild.nextElementSibling;
        tbody.innerHTML="";
        for(let i=0;i<vlist.length;i++){
            let tr = document.createElement('tr')
            let td = document.createElement('td')
            td.value = vlist[i]['vtype']
            td.innerHTML = vlist[i]['vtype']
            tr.appendChild(td);
            td = document.createElement('td');
            td.value = vlist[i]['vnumber']
            td.innerHTML = vlist[i]['vnumber']
            tr.appendChild(td);
            td = document.createElement('td')
            td.value = vlist[i]["time"];
            td.innerHTML = vlist[i]["time"];
            tr.appendChild(td);
            td = document.createElement('td');
            td.value = vlist[i]["tname"];
            td.innerHTML = vlist[i]["tname"];
            tr.appendChild(td);
            td = document.createElement('td');
            td.value=vlist[i]['tariff']
            td.innerHTML=vlist[i]['tariff']
            tr.appendChild(td)
            tbody.appendChild(tr)
        }
    }
    updateVehicleList(app.getVehicleData())
    overlay.addEventListener('click', () => {
        const modals = document.querySelectorAll('.modal.active')
        modals.forEach(modal => {
            closemodal(modal)
        })
    })

    openmodalbutton.addEventListener('click', () => {
            const modal = document.querySelector(openmodalbutton.dataset.modalTarget)
            openmodal(modal)
    })
    closemodalbutton.addEventListener('click', () => {
            const modal = closemodalbutton.closest('.modal')
            closemodal(modal)
    })

    function openmodal(modal) {
        if (modal == null) return
        modal.classList.add('active')
        overlay.classList.add('active')
        modal.innerHTML = `      <div class="modal-header">
        <div class="title">Add New Toll</div>
        <button data-close-button class="close-button">&times;</button>
      </div>
      <div class="modal-body">
        <form action="">
          <div>Toll Name:<input id="addnewtoll" type="text" required="required"></div>
          Vehicle fare details:
          <div>
            <select name="vehicle" id="newtoll1" required="required">
              <option value="">select vehicle type</option>
              <option value="carjeepvan">car/jeep/van</option>
              <option value="LCV">LCV</option>
              <option value="truckbus">truck/bus</option>
              <option value="heavyvehicle">heavy vehicle</option>
            </select>
            <input type="numbers" placeholder="single journey" required="required" id="newtoll1single">
            <input type="numbers" placeholder="return journey" required="required" id="newtoll1return">
          </div>
          <div>
            <select name="vehicle" id="newtoll2" required="required">
              <option value="">select vehicle type</option>
              <option value="carjeepvan">car/jeep/van</option>
              <option value="LCV">LCV</option>
              <option value="truckbus">truck/bus</option>
              <option value="heavyvehicle">heavy vehicle</option>
            </select>
            <input type="numbers" placeholder="single journey" required="required" id="newtoll2single">
            <input type="numbers" placeholder="return journey" required="required" id="newtoll2return">
          </div>
          <div>
            <select name="vehicle" id="newtoll3" required="required">
              <option value="">select vehicle type</option>
              <option value="carjeepvan">car/jeep/van</option>
              <option value="LCV">LCV</option>
              <option value="truckbus">truck/bus</option>
              <option value="heavyvehicle">heavy vehicle</option>
            </select>
            <input type="numbers" placeholder="single journey" required="required" id="newtoll3single">
            <input type="numbers" placeholder="return journey" required="required" id="newtoll3return">
          </div>
          <div>
            <select name="vehicle" id="newtoll4" required="required">
              <option value="">select vehicle type</option>
              <option value="carjeepvan">car/jeep/van</option>
              <option value="LCV">LCV</option>
              <option value="truckbus">truck/bus</option>
              <option value="heavyvehicle">heavy vehicle</option>
            </select>
            <input type="numbers" placeholder="single journey" required="required" id="newtoll4single">
            <input type="numbers" placeholder="return journey" required="required" id="newtoll4return">
          </div>
          <button type="submit" id="submittoll">Submit</button>
        </form>
      </div>`;
      closemodalbutton = document.querySelector('[data-close-button]')
      closemodalbutton.addEventListener('click',(e)=>{
        closemodal(e.target.parentElement.parentElement) ;
      })
      document.querySelector('#submittoll').addEventListener('click',addToll);
    }

    function closemodal(modal) {
        if (modal == null) return
        modal.classList.remove('active')
        overlay.classList.remove('active')
    }
    const submittoll=document.querySelector('#submittoll')
    submittoll.addEventListener("click",addToll)
    function addToll(e){
        e.preventDefault();
        const addnewtoll=document.querySelector('#addnewtoll').value
        const newtoll1=document.querySelector('#newtoll1').value
        const newtoll1single=document.querySelector('#newtoll1single').value
        const newtoll1return=document.querySelector('#newtoll1return').value
        
        const newtoll2=document.querySelector('#newtoll2').value
        const newtoll2single=document.querySelector('#newtoll2single').value
        const newtoll2return=document.querySelector('#newtoll2return').value

        const newtoll3=document.querySelector('#newtoll3').value
        const newtoll3single=document.querySelector('#newtoll3single').value
        const newtoll3return=document.querySelector('#newtoll3return').value

        const newtoll4=document.querySelector('#newtoll4').value
        const newtoll4single=document.querySelector('#newtoll4single').value
        const newtoll4return=document.querySelector('#newtoll4return').value

        const toll={}
        toll["tollname"]=addnewtoll
        toll[newtoll1]={single:newtoll1single,return:newtoll1return}
        toll[newtoll2]={single:newtoll2single,return:newtoll2return}
        toll[newtoll3]={single:newtoll3single,return:newtoll3return}
        toll[newtoll4]={single:newtoll4single,return:newtoll4return}
        console.log(toll)
        app.addNewToll(toll);
    }
    const newvehicle=document.querySelector("#newvehicle")
    newvehicle.addEventListener('click',(e)=>{ 
        e.preventDefault()
        openmodalbutton.click()
        const modal=document.querySelector("#modal")
        const modalheader=modal.firstElementChild;
        const modalheaderdiv=modalheader.firstElementChild;
        modalheaderdiv.innerHTML="Add new vehicle";
        modalbody = modalheader.nextElementSibling;
        modalbody.innerHTML =
        `<form  action="">
            <div class="f-col">
            <select name="vehicle" id="addvehicle" required="required">
                <option value="">select vehicle type</option>
                <option value="carjeepvan">car/jeep/van</option>
                <option value="LCV">LCV</option>
                <option value="truckbus">truck/bus</option>
                <option value="heavyvehicle">heavy vehicle</option>
            </select>
            <label>Vehicle Number</label>
            <input type="text" placeholder="Enter vehicle number" required="required" id="vnumber">
            <label>Toll Name </label>
            <input type="text" placeholder="Enter Toll name" required="required" id="tname">
            <label>Tariff</label>
            <input type="numbers" placeholder="Enter tariff" required="required" id="tariff">
            </div>
            <button type="submit" id="submitvehicle">Submit</button>
        </form>`;   
        let sbtn = document.querySelector("#submitvehicle");
        sbtn.addEventListener('click',(e)=>{
            e.preventDefault();
            let vnumber = document.querySelector("#vnumber").value;
            let tariff = document.querySelector("#tariff").value;
            let vtype = document.querySelector("#addvehicle").value;
            let tname = document.querySelector("#tname").value;
            app.addVehicleData({vtype,vnumber,tariff,tname,time:  new Date().toLocaleString()})
            console.log(app.getVehicleData())
        })
    })
    const alltolls = document.querySelector("#alltolls")
    alltolls.addEventListener('click',(e)=>{
        e.preventDefault();
        tbl.innerHTML=""// empty table
        thead = document.createElement("thead")
        thead.setAttribute('id','thead')
        tbody = document.createElement("tbody")
        tbody.setAttribute('id','tbody')
        let val = ["toll name","car/jeep/van","lcv","truck/bus","heavy vehicle"];
        let tr = document.createElement("tr")
        for(let i=0;i<5;i++){
            let th = document.createElement("th")
            th.value=val[i]
            th.innerHTML=val[i]
            tr.appendChild(th)
        }
        thead.appendChild(tr)
        tbl.appendChild(thead)
        let list = app.getTollData()

/*LCV: {single: '23', return: '45'}
carjeepvan: {single: '12', return: '34'}
heavyvehicle: {single: '25', return: '3465'}
tollname: "asdf"
truckbus: {single: '11', return: '22'}
*/
        for(let i=0;i<list.length;i++)
        {
            tr=document.createElement("tr")
            td = document.createElement('td')
            td.value = list[i]['tollname']
            td.innerHTML = list[i]['tollname']
            tr.appendChild(td)

            td=document.createElement("td")
            td.value=list[i]["carjeepvan"]["return"]+"/"+list[i]["carjeepvan"]["single"]
            td.innerHTML=list[i]["carjeepvan"]["return"]+"/"+list[i]["carjeepvan"]["single"]
            tr.appendChild(td)

            td=document.createElement("td")
            td.value=list[i]["LCV"]["return"]+"/"+list[i]["LCV"]["single"]
            td.innerHTML=list[i]["LCV"]["return"]+"/"+list[i]["LCV"]["single"]
            tr.appendChild(td)

            td=document.createElement("td")
            td.value=list[i]["truckbus"]["return"]+"/"+list[i]["truckbus"]["single"]
            td.innerHTML=list[i]["truckbus"]["return"]+"/"+list[i]["truckbus"]["single"]
            tr.appendChild(td)

            td=document.createElement("td")
            td.value=list[i]["heavyvehicle"]["return"]+"/"+list[i]["heavyvehicle"]["single"]
            td.innerHTML=list[i]["heavyvehicle"]["return"]+"/"+list[i]["heavyvehicle"]["single"]
            tr.appendChild(td)
            tbody.appendChild(tr)
        }
        tbl.appendChild(tbody)
    })
})
//iife -> immediately invoked function expression
const app = (function () {
    function addNewToll(data) {
        if(localStorage.getItem('toll')){
            let temp = [...JSON.parse(localStorage.getItem('toll')),data]
            localStorage.setItem('toll',JSON.stringify(temp))
        }else{
            localStorage.setItem('toll',JSON.stringify([data]));
        }
    }
    function getTollData() {
        return JSON.parse(localStorage.getItem('toll')|| "[]")
    }
    function addVehicleData(data) {
        if(localStorage.getItem('vehicle')){
            let temp = [...JSON.parse(localStorage.getItem('vehicle')) || [],data]
            localStorage.setItem('vehicle',JSON.stringify(temp));
        }else{
            localStorage.setItem('vehicle',JSON.stringify([data]));
        }
    }
    function getVehicleData() {
        return JSON.parse(localStorage.getItem('vehicle')|| "[]")
    }
    return {
        addNewToll,
        getTollData,
        addVehicleData,
        getVehicleData
    }
})()

