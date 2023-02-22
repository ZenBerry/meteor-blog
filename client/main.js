import './main.html';
import { Mongo } from 'meteor/mongo';

student = new Mongo.Collection('student');

Template.Insert.events({
    'click .post-button': function (event) { // Function which gets Activated on Click of Insert

        // Taking the Value in Registers
        var d_name = $('#Name').val();
        var d_email = $('#Email').val();
        var d_password = $('#Password').val();
        var d_address = $('#Address').val();

        // Mongo Query to Insert into Collection Student
        student.insert(
            {
                name: d_name,
                email: d_email,
                password: d_password,
                address: d_address
            });
        
        // JavaScript Code to Clear the Input After Inserting
        document.getElementById('Name').value = "";
        document.getElementById('Email').value = "";
        document.getElementById('Password').value = "";
        document.getElementById('Address').value = "";
        document.getElementById('Message').innerHTML = "Data was Inserted Sucessfully";
    }
}
);

Template.body.helpers({ // Function that Displays all the Records
    'resolutions': function () {
        return student.find().fetch(); // Mongo Query find() is Select * in SQL
    }
});
Template.resolution.events({
    'click ': function () {
        student.remove(this._id); // Mongo Query that removes item from collection

        // this._id selects the item associated to the button in the UI
    }
});

Template.Update.events({
    'click .updateusr':function(event)
    {
        // Taking the Value in Registers
        var d_name = $('#Name').val();
        var d_email = $('#Email').val();
        var d_password = $('#Password').val();
        var d_address = $('#Address').val();

        // Finding the document to update
        var doc=student.findOne({name:d_name});

        console.log(doc);

        student.update({_id:doc._id},
            {   
                $set:
                {
                    name : d_name,
                    email : d_email,
                    password : d_password,
                    address : d_address
                }
            });

        document.getElementById('Message').innerHTML = "Data was Sucessfully Updated";
    }
})
