




const template = document.getElementById("movie-template")
const sectionMain = document.getElementById("section-main")
const searchBar = document.getElementById("searchBar")
const searchBtn = document.getElementById("searchBtn")


async function fetcher() {
  const imageBaseURL= "https://image.tmdb.org/t/p/w500/"
  
  const key = "a2a148ce8705db97e36f8882b941d487"
  const query = searchBar.value
  try {
    let response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${encodeURIComponent(query)}`, {
      headers: {
        accept: "application/json"
      }
    })

    let data = await response.json()
    console.log(data.results)
    const results = data.results
    console.log(results.length)
    console.log(results)
    
    // lets push the data to the page...............
    sectionMain.innerHTML =''//clearing existing divs
    
    results.forEach(result => {
      const clone = template.content.cloneNode(true)
      let imagePath = result.poster_path
      const imageUrl=imagePath ? `${imageBaseURL}${imagePath}`: "/assets/defaultImage.png";
      clone.querySelector("#movie-image").src = imageUrl
      clone.querySelector("#movie-title").textContent = result.title
      clone.querySelector("#movie-year").textContent = result.release_date;
      sectionMain.appendChild(clone);
    })
    if(results.length===0){
      sectionMain.innerHTML= "<h1>Movie Not Found</h1>"
      console.log("not found")
    }
   
  }
  catch (error) {
    console.log(error)
  }

}
searchBtn.addEventListener("click", () => {
  fetcher()
})
searchBar.addEventListener("keydown",(event)=>{
  if(event.key=="Enter"){
    fetcher()
  }
})









