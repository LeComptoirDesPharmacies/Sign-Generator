# SignGenerator

SignGenerator is a desktop application that allows you to create email signatures as HTML files stored on your computer. It allows you to enter personalized information for each team member and assign banners according to the department or person.
All images are stored in a S3 bucket.

## Installation

### Requirements

* Git
* Yarn (>=1.12.3)
* S3 bucket

### Usage
Clone the SignGenerator's repository :

`git clone https://github.com/LeComptoirDesPharmacies/Sign-Generator.git`

In order to run the application, please go to the root of the repository and run this command :

`yarn install`

When you have run the command above, all the dependencies needed will be installed. To run the project in development mode run this command :

`yarn dev`

And for release :

`yarn package-[win32/linux/ci]`
