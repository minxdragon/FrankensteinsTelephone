// Start the hosted models waking up
 function wakeUp() {
    var model = new rw.HostedModel({
          url: "YourURLGoesHere",
      });
      console.log("deeplab waking up")
    var model = new rw.HostedModel({
      url: "YourURLGoesHere",
    });
    console.log("spadeCoco waking up")
    var model = new rw.HostedModel({
      url: "YourURLGoesHere",
      });
      console.log("im2txt waking up")
  }

// upload file as a base64 image

    function readFile() {
  
  if (this.files && this.files[0]) {
    
    var FR= new FileReader();
    
    FR.addEventListener("load", function(e) {
      document.getElementById("img").src       = e.target.result;
      //document.getElementById("b64").innerHTML = e.target.result;
    }); 
    
    FR.readAsDataURL( this.files[0] );
  }
  
}
document.getElementById("inp").addEventListener("change", readFile);

document.getElementById('img').onchange = function (e) {
    var loadingImage = loadImage(
        e.target.files[0],
        function (img) {
            document.getElementById("img").src = img.toDataURL();
        },
        {orientation: 1}
    );
    if (!loadingImage) {
        // Alternative code ...
    }
};
    
// start deeplab model
    function deepLabModelSelfie(){
        console.log("deeplab loading")
        document.getElementById("deepLab")
         .setAttribute(
          "src", "loadingcircle.gif",
          "alt", "Loading",
          );

        const model = new rw.HostedModel({
            url: "YourURLGoesHere",
        });
        console.log("deeplab loaded")
        var result = document.getElementById("img").src;

        var image
        //console.log(result)
        //You can use the info() method to see what type of input object the model expects
        //model.info().then(info => console.log(info));
            const inputs = {
            "image": result
        };
        model.query(inputs).then(outputs => {
            const { image } = outputs;

            // this changes a placeholder image rather than creating a new one. setAttribute is for changing a base64 image
        document.getElementById("deepLab")
            .setAttribute(
            "src", image,
            "alt", "DeepLab segmentation produced from caption",
            );
        
    var img = document.getElementById('deepLab');

    //Code for adding a new image instead
       // document.body.appendChild(img);
        
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

    const model = new rw.HostedModel({
        url: "YourURLGoesHere",
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
        url: "YourURLGoesHere",
        });
        console.log("im2txt loaded")
    //// You can use the info() method to see what type of input object the model expects
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