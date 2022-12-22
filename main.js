imgArray = [];
for(let i=1; i<=8; i++){
    imgArray.push(i);
    imgArray.push(i);
}

function shuffleArray(array){
    for(let i=array.length-1; i>0; i--){
        const j = Math.floor(Math.random()*(i+1));
        [array[i], array[j]]=[array[j], array[i]];
    }
}

$( function() {
    function startGame(array){
        let imgArray = array;
        shuffleArray(imgArray);
        for(let i=0; i<imgArray.length; i++){
            $(".grid-cards").append(`
                <button class="card" id="${imgArray[i]}" name="${i+1}">
                </button>
            `);
        }
        $(".card").on("click", showImage);
    }
    startGame(imgArray);

    let upImages = [];
    let completedAnimals = [];
    
    $('[name="restartGame"]').on("click", restartGame);

    function showImage(){
        if($(this).attr("class") === "completed"){
            return;
        }

        let card_name = $(this).attr("name");
        let animal_id = $(this).attr("id");

        if(upImages.length === 1){
            if(upImages[0].animalId === animal_id && upImages[0].cardName != card_name){
                upImages.push({
                    animalId: animal_id,
                    cardName: card_name
                });
                completedAnimals.push(animal_id);
                $(`[name="${card_name}"]`).css("background-image", `url("./public/img/${animal_id}.png")`);
                for(i=0; i<upImages.length; i++){
                    $(`[name="${upImages[i].cardName}"]`).attr('class', 'completed');
                }
                upImages = [];
                if(completedAnimals.length == 8){
                    alert("You won!");
                }
                return;
            }            
        }

        if(upImages.length === 2){
            for(i=0; i<2; i++){
                $(`[name="${upImages[i].cardName}"]`).css("background-image", `none`);
            }
            upImages = [];
        }        
    
        $(`[name="${card_name}"]`).css("background-image", `url("./public/img/${animal_id}.png")`);    

        upImages.push({
            animalId: animal_id,
            cardName: card_name
        });
    }

    function restartGame(){
        $(".grid-cards").empty();
        startGame(imgArray);
        upImages = [];
        completedAnimals = [];
    }
});