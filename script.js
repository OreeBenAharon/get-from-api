let results = []
let preItem = ""
let categ = ""

const submit = async () => {

    categ = document.querySelector('input[name=categ]:checked').value;
    if (categ === undefined || categ === null) {
        console.log("no category was selected")
        window.alert("no category was selected")
        return
    }
    const query = document.querySelector('.query')
    console.log(query.value)
    if (query.value === undefined || query.value === null) {
        console.log("nothing to search")
        window.alert("nothing to search")
        return
    }

    try{
        console.log("is",query.value)
        const res = await fetch(`https://api.pexels.com/${categ}/search?per_page=20&query=${query.value}`,{
            method:'GET',
            headers:{
                authorization: "563492ad6f91700001000001d5b218de203043208f90bcfd643c8be3",
            }
        })
        results = await res.json()

        const container = document.querySelector(".results")
        container.innerHTML = ""
        const preResults = document.querySelector(".pre-results")
        
        console.log("start",container)
        if (results.total_results === 0) {
            container.innerHTML= "<h1>No results!</h1>"
            preResults.style.display = "none"
        } else {
            preResults.style.display = "inline"
            for (let i = 0; i < 20; i++) {
                if (categ === "v1") {
                    const item = document.createElement('img')
                    item.src = results.photos[i].src.medium
                    item.width = 400
                    item.height = 300
                    item.index = i
                    item.className = "result-item" 
                    console.log(item)
                    container.appendChild(item)
                    if (i === 0) {
                        preItemClass = document.querySelector('.pre-item')
                        preItem = document.createElement('img')
                        preItem.src = results.photos[0].src.medium
                        preItem.width = 400
                        preItem.height = 300
                        preItem.index = 0
                        console.log("i is "+preItem.index)
                        preItem.className = "result-item"
                        preItemClass.appendChild(preItem)
                        }
                
                } else  {
                    const item = document.createElement('video')
                    item.width = 400
                    item.height = 300
                    item.className = "result-item" 
                    item.controls = true
                    item.index = i
                    item.innerHTML = (`<source src="${results.videos[i].video_files[3].link}" type="video/mp4"></source>`)
                    container.appendChild(item)
                    if (i === 0) {
                        preItem = document.createElement('video')
                        const preItemClass = document.querySelector('.pre-item')
                        preItem.src = results.videos[0].video_files[3].link
                        preItem.width = 400
                        preItem.height = 300
                        preItem.index = 0
                        preItem.className = "result-item"
                        preItemClass.appendChild(preItem)
                        }

                    }
            }
        }
        // container.style.display = "flex"

        console.log("end:",container)
    }
    catch(err){
        console.log(err)
    }
}

const change = (n)=>{
    if (categ === "v1") {
        if (n === 0) {
            if (preItem.index === 0)  {
                preItem.index = 19
                preItem.src = results.photos[preItem.index].src.medium
                }
            else {
                preItem.index--
                preItem.src = results.photos[preItem.index].src.medium
                }
        } else {
            if (preItem.index === 19) {
                preItem.index = 0
                preItem.src = results.photos[preItem.index].src.medium
                }   
            else {
                console.log(preItem.index)
                preItem.index++
                preItem.src = results.photos[preItem.index].src.medium
                }    
        }   
    } else {
        if (n === 0) {
            if (preItem.index === 0)  {
                preItem.index = 19
                preItem.src = results.videos[preItem.index].video_files[3].link
                }
            else {
                preItem.index--
                preItem.src = results.videos[preItem.index].video_files[3].link
             }
        } else {
            if (preItem.index === 19) {
                preItem.index = 0
                preItem.src = results.videos[preItem.index].video_files[3].link
                }   
            else {
                console.log(preItem.index)
                preItem.index++
                preItem.src = results.videos[preItem.index].video_files[3].link
             }    
        }
    }

}