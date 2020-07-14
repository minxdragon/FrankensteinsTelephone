# Frankenstein's Telephone

This project uses chained machine learning algorithms to relate to each other and generate new images. it is part of an interactive art project by Artificial Intelligence artist J. Rosenbaum for the City of Melbourne. The algorithms used are hosted on RunwayML, a machine learning platform for artists. It uses [attnGAN](https://github.com/taoxugit/AttnGAN), an image generator that works from a caption that you write, [DeepLab](https://github.com/genekogan/deeplab-pytorch), which segments images based on image classification data, [SpadeCOCO](https://github.com/agermanidis/SPADE-COCO) which generates a new image based on the original and [Im2txt](https://github.com/tensorflow/models/tree/master/research/im2txt) which uses image classification to generate a caption based on the final image in the sequence.

There are two separate HTML files here, one with caption writing, which is based on the original art project, and an image upload version. I have also uploaded the scripts on their own.

The HTML files are the stripped down source code showing how the models work together and may be handy for others. They are unstyled and designed for you to insert your own URL data, styling and to use as an example of chained RunwayML hosted models.

This will not run as it is, it needs the hosted URL information.
To run this code clone it and host the models in RunwayML and insert your unique URL every place where it says YourUrlGoesHere.

### To see this in action with full styling please visit https://www.frankensteinstelephone.com

![Frankensteins Telephone](/1.png)

*Known Issues*

* Image exif rotation is a periodic problem in the image upload. I am working on a baked in rotation solution but it is being very pesky.
* Text entry doesn't work in iOS. - literally no idea why.

If you find this helpful please drop me a line or put a credit in for J. Rosenbaum. thanks!
