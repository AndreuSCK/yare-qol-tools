// ==UserScript==
// @name         YareQoLTools
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Kenzy#0101 YareQoLTools
// @author       Kenzy#0101
// @match        *://yare.io/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {
    console.log("Kenzy#0101 Yare QoL Tools")


//Intercept fetch
if( window.location.href == "https://yare.io/hub"){
const oldFetch = window.fetch;
let replayData
window.fetch = function () {
    return new Promise((resolve, reject) => {
        oldFetch
            .apply(this, arguments)
            .then(async (response) => {
                const json = await response.clone().json();
                 hubPopulateReplay(json)
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};
    function hubPopulateReplay(replayData) {
        if (replayData.data == "populate"){
            const hubTableReplay = document.querySelector("#hubfill")
            setTimeout(() => {
                // console.log(replayData.stream)
            replayData.stream.forEach((ele, index) => {
                let replayDiv = document.createElement("a");
                replayDiv.classList.add(`replayDivButton`)
                replayDiv.innerText = "Replay- "
                replayDiv.href= ele.server + '/' + ele.game_id
                hubTableReplay.children[index].children[0].insertBefore(replayDiv, hubTableReplay.children[index].children[0].children[3]);
            })
            }, 100)
        }
    }
}


    document.addEventListener ("DOMContentLoaded", DOMReady)
    function DOMReady() {
        console.log("DOM Ready")



    const menu = document.querySelector(".menu")
    //Replay Button
    const restartBotElement = document.createElement("div");
    restartBotElement.setAttribute("id", "restartBot");
    restartBotElement.innerText = "Start bot";
    menu.prepend(restartBotElement)


    //Selection
    const restartSelection = document.createElement("div");
    restartSelection.setAttribute("id", "restartSelection")
    restartBotElement.append(restartSelection)
    restartSelection.style.display = "none"


    //Options
    let restart_dumb = document.createElement("div")
    let restart_medium = document.createElement("div")
    let restart_will = document.createElement("div")
    let restart_options = [restart_dumb, restart_medium, restart_will]
    restart_dumb.setAttribute("id", "restart_dumb")
    restart_medium.setAttribute("id", "restart_medium")
    restart_will.setAttribute("id", "restart_will")


    restart_options.forEach((ele, index) => {
        ele.innerText = ele.id.split('_')[1]
        ele.classList.add('restart_options')

        ele.addEventListener('click', () => {
            restartBotFunction(ele.id.split('_')[1])
        })

        restartSelection.append(ele)
    })

     restartBotElement.addEventListener('click', () => {
         if (restartSelection.style.display == "none") {
     restartSelection.style.display = "block"

         } else {
     restartSelection.style.display = "none"
         }
    })


        if (getCookie('user_id') !== "anonymous"){
            restartBotElement.style.display = "block";
        }


          function restartBotFunction(botToReplay) {
         	  	fetch('/new-game', {
	          method: "POST",
	          headers: {
	            Accept: "application/json",
	            "Content-Type": "application/json"
	          },
	          body: JSON.stringify({
	  	        user_id: getCookie('user_id'),
				user_shape: "circles",
			    user_color: "gblue",
	  	        session_id: getCookie('session_id'),
	  			type: botToReplay + '-bot'
	  	    })
	  	}).then(response => response.json())
	        .then(response => {
	  		  //redirect to game id
	  		  // console.log(response);
	  		  game_id = response.g_id;
	  		  if (response.meta == 'easy-bot'){
                  window.location.href = 'https://yare.io/' + response.server + 'n/' + response.g_id;
	  		  } else if (response.meta == 'medium-bot' || response.meta == 'dumb-bot' || response.meta == 'will-bot'){
                  window.location.href = 'https://yare.io/' + response.server + 'n/' + response.g_id;

		  	  }


	  	  })
	        .catch(err => {
	  		  console.log(err);
	  	  });
     };







    //decoration
    for ( const ele of menu.children){
        if (ele.href == "https://yare.io/documentation"){
        ele.innerText = "Docs"
        }}

    const newStyle = document.createElement('style');
newStyle.innerHTML = `


      #restartBot {
      user-select: none;
     color: #ffffff;
    font-weight: 500;
    font-size: 14px;
    line-height: 44px;
    display: none;
    float: left;
    margin-left: 36px;
    cursor: pointer;

      }
   .restart_options {



   }



      .replayDivButton {
           color: #ffffff;
    font-weight: 500;
    font-size: 14px;
    line-height: 44px;
    display: block;
    float: left;
    margin-right: 20px;
    cursor: pointer;
      }
      .replayDivButton:hover {
      font-size:16px;
      position: relative;
             font-size:16px;
             transition: 100ms;
      }
     .restart_options{
     }
      body {
         //background-color: #1c0312;
      };
    `;

    document.head.appendChild(newStyle);
    }
})();