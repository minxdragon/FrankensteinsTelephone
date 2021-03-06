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
      document.getElementById("imgUpload").src       = e.target.result;
      //document.getElementById("b64").innerHTML = e.target.result;
    }); 
    
    FR.readAsDataURL( this.files[0] );
  }
  
}
document.getElementById("inp").addEventListener("change", readFile);

document.getElementById('imgUpload').onchange = function (e) {
    var loadingImage = loadImage(
        e.target.files[0],
        function (img) {
            document.getElementById("img").src = img.toDataURL();
        },
        {orientation: 1}
    );
    //if (!loadingImage) {
        // Alternative code ...
    //}
};

var originalImage = document.getElementById("imgUpload"),
	resetImage = document.getElementById("img");

function readFile() {
  if (this.files && this.files[0]) {
    var FR= new FileReader();
    FR.addEventListener("load", function(e) {
    	// Here is the code that gets called when the JS first gets its hands on the image.
      const rawImageData = e.target.result;
      
      // Set the "original" view:
      document.getElementById("imgUpload").src = rawImageData;

			// Should be able to do rotation right here.
			resetOrientation(rawImageData, 1, function(resetBase64Image) {
        console.log( resetBase64Image );
        resetImage.src = resetBase64Image;
        console.log("rotated image")
      });
    } );

    FR.readAsDataURL( this.files[0] );
  }
}

// call file loader when the user picks a file to upload.
document.getElementById("inp").addEventListener("change", readFile);

//rotate orientation
function resetOrientation(srcBase64, srcOrientation, callback) {
	var img = new Image();	

	img.onload = function() {
  	var width = img.width,
    		height = img.height,
        canvas = document.createElement('canvas'),
	  		ctx = canvas.getContext("2d");
		
    // set proper canvas dimensions before transform & export
		if (4 < srcOrientation && srcOrientation < 9) {
    	canvas.width = height;
      canvas.height = width;
    } else {
    	canvas.width = width;
      canvas.height = height;
    }
	
  	// transform context before drawing image
	switch (srcOrientation) {
      case 2: ctx.transform(-1, 0, 0, 1, width, 0); break;
      case 3: ctx.transform(-1, 0, 0, -1, width, height ); break;
      case 4: ctx.transform(1, 0, 0, -1, 0, height ); break;
      case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
      case 6: ctx.transform(0, 1, -1, 0, height , 0); break;
      case 7: ctx.transform(0, -1, -1, 0, height , width); break;
      case 8: ctx.transform(0, -1, 1, 0, 0, width); break;
     default: break;
    }

		// draw image
    ctx.drawImage(img, 0, 0);

    // export base64
    callback(canvas.toDataURL('image/jpeg'));
    //canvas.toBlob('image/jpeg', 0.15);
  };

  img.src = srcBase64;
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
