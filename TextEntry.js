// Start the hosted models waking up
 function wakeUp() {
    var model = new rw.HostedModel({
          url: "YourUrlGoesHere",
      });
      console.log("deeplab waking up")
    var model = new rw.HostedModel({
      url: "YourUrlGoesHere",
    });
    console.log("spadeCoco waking up")
    var model = new rw.HostedModel({
      url: "YourUrlGoesHere",
      });
      console.log("im2txt waking up")
  }
// start AttnGan
  function attnGanModel() {
     document.getElementById("attnGan")
   .setAttribute(
         "src", "loadingcircle.gif",
         "alt", "Loading",
         );
      var entry = document.getElementById("textInput").value;
      const model = new rw.HostedModel({
      url: "YourUrlGoesHere",
      });
      // You can use the info() method to see what type of input object the model expects
      //  model.info().then(info => console.log(info));
          const inputs = {
          "caption": entry
      // "caption": "a person on a bench"
      };
          console.log(entry)

      // set attribute sets the image placeholder to the base 64 image results from attngan
          model.query(inputs).then(outputs => {
          const { result } = outputs;
      // use the outputs in your project

      // this changes a placeholder image rather than creating a new one
      // console.log(result) 
          document.getElementById("attnGan")
          .setAttribute(
          "src", result,
          "alt", "ATTNGAN image produced from caption",
          );

      })
  }

    
// start deeplab model
    function deepLabModelSelfie(){
        console.log("deeplab loading")
        document.getElementById("deepLab")
         .setAttribute(
          "src", "loadingcircle.gif",
          "alt", "Loading",
          );

        const model = new rw.HostedModel({
            url: "YourUrlGoesHere",
        });
        console.log("deeplab loaded")
        var result = document.getElementById("attnGan").src;
        //var deepLabResult = document.getElementById("deepLab").src;
        var image
        //console.log(result)
        //You can use the info() method to see what type of input object the model expects
        //model.info().then(info => console.log(info));
            const inputs = {
            "image": result
        };
        model.query(inputs).then(outputs => {
            const { image } = outputs;
            // use the outputs in your project
            //console.log(image)
            // this changes a placeholder image rather than creating a new one. the setAttribute is used for base64 images 
        document.getElementById("deepLab")
            .setAttribute(
            "src", image,
            "alt", "DeepLab segmentation produced from caption",
            );
        
    var img = document.getElementById('deepLab');
       // document.body.appendChild(img);
    
    //Generate New image instead of swapping out a placeholder
    //img.src = event.target.result;
       // var originalImage = document.getElementById("deepLab"),
		//resetImage = document.getElementById("deepLab");

        //resetOrientation(originalImage.src, 5, function(resetBase64Image) {
	    //   resetImage.src = resetBase64Image;
        //    });
            
        });
        
    };

    document.getElementById("deepLab").addEventListener("change", spadeCocoModel);

// run spade COCO
function spadeCocoModel(){
    document.getElementById("spadeCoco")
         .setAttribute(
          "src", "loadingcircle.gif",
          "alt", "Loading",
          );
    var convert = document.getElementById("deepLab").src;
    //var convert = image
    const model = new rw.HostedModel({
        url: "YourUrlGoesHere",
    });
    console.log("spadecoco loaded")
    // You can use the info() method to see what type of input object the model expects
    // model.info().then(info => console.log(info));
        const inputs = {
        "semantic_map": convert
        };
    model.query(inputs).then(outputs => {
    const { output } = outputs;
  // use the outputs in your project
        // console.log(output)
        document.getElementById("spadeCoco")
            .setAttribute(
            "src", output,
            "alt", "SpadeCoco image produced from segmented work",
            );
    });
    
    
}

document.getElementById("spadeCoco").addEventListener("change", imTxtModel);

//run im2txt
function imTxtModel(){
    document.getElementById("imTxt").innerHTML = "loading..."
    var image = document.getElementById("spadeCoco").src;
    const model = new rw.HostedModel({
        url: "YourUrlGoesHere",
        });
        console.log("im2txt loaded")
    // You can use the info() method to see what type of input object the model expects
    model.info().then(info => console.log(info));
    const inputs = {
        "image": image
    };
    model.query(inputs).then(outputs => {
        const { caption } = outputs;
        console.log(caption)
        document.getElementById("imTxt").innerHTML = caption
    // use the outputs in your project
});
}
    // this function contains the actions for running the algorithms
   
    function textEntry() {

        attnGanModel();
        var caption = document.getElementById("textInput").innerHTML;
        document.getElementById("printCaption").innerHTML = caption;
        //console.log("Image 1 loaded");
        deepLabModel();
        spadeCocoModel();
        imTxtModel();
        

        }