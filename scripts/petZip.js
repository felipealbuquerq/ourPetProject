$(document).ready(function(){
  $(".zip").on("click", function(e){
    debugger;
    e.preventDefault();
    var animal = $("#animal").val();
    var zipCode = $("#enterZip").val();

    if(zipCode === ""){
      $("#noZip").show().fadeOut(3500);
      return;
    } else {
      searchByZip();
    }
  })
  //on animal2 selection populate the breed list
  //animal alert needs 2 event listeners: one for search button, and one for breed button
  // $("#animal").change(function(){
  //   var animal = $("#animal2").val(); 

  //   $(".menu").empty();  
    
  //   breedChecker();   
  //   //$('#selectBreed').select2();
  // });

  $(".breedSearch").on("click", function(e) {
    e.preventDefault();
    
    searchByBreed();
  });

  function searchByZip(){   
    var animal = $("#animal").val();
    var zipVal = $("#enterZip").val();
    var petFAPI = "https://crossorigin.me/https://api.petfinder.com/pet.find?"
    var petFAPIParam = {
      key: "311acd0ca6ee16428a93eb5dafe77634",
      animal: animal,
      location: zipVal,
      count: 1,
      output: "full",
      format: "json"
    }

    $("#breedResult").empty();
    $(".photoRow").empty();

    $.ajax({     
      type:"GET",
      url: petFAPI + $.param(petFAPIParam),
      success: function(response){
        var newPetInfo = response.petfinder.pets.pet
        var newPetContact = response.petfinder.pets.pet.contact
        var petOptions = response.petfinder.pets.pet.options.option;
        var petPhoto = response.petfinder.pets.pet.media.photos.photo;
        var yourPet = $("<h2>Meet " + newPetInfo.name["$t"] + ", a size " + newPetInfo.size["$t"]+" " + newPetInfo.age["$t"] +" "+ newPetInfo.sex["$t"] + " from " + newPetContact.city["$t"] +", "+newPetContact.state["$t"] + "</h2>");
        var yourPetP = $("<p>").addClass("col-xs-12 col-md-10 col-md-offset-1").text(newPetInfo.description["$t"]);
        var yourPetContact = $("<h3>To adopt " + newPetInfo.name["$t"] + ", please call " + newPetContact.phone["$t"] +"</h3>").addClass("col-xs-12");

        $("#breedResult").prepend(yourPetP);
        $("#breedResult").prepend(yourPet);
        $("#breedResult").append(yourPetContact);

        for(i=0; i<petPhoto.length; i++){
          
          if(petPhoto[i]["@size"] === "pn"){            
            var newPetPic = $("<img>").attr("src", petPhoto[i]["$t"])
              .addClass("img-responsive");
            var newPetPicDiv = $("<div>").addClass("col-xs-6 col-md-4");

            newPetPicDiv.append(newPetPic);
            $(".photoRow").append(newPetPicDiv);
          }
        }

        if($(".img-responsive").length === 1){
          var newPetPicDiv = $("<div>")
            .addClass("col-xs-12 col-md-4 col-md-offset-4");

            newPetPicDiv.append(newPetPic);
            $(".photoRow").empty().append(newPetPicDiv);
        }; 

        for(i=0; i<petOptions.length; i++){
          var newPDiv = $("<div>").addClass("col-xs-6 col-md-3 well well-sm");
          var newP = $("<h4>").text(petOptions[i]["$t"]);

          newPDiv.append(newP);
          $("#breedResult").append(newPDiv);
        }
        
        // contact-city+ state+ zip email phone
      }
    })
  };
});
