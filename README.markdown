_Disclaimer: This is the product of a few minutes tinkering and not a production worthy library. Just an idea_

# Dojo Binding #

Provides data.binding which allows for the binding of form fields to a JS object stored inside the binding. On change of fields it will update the binding object. The binding object provides a location for connecting up events and reactions to the change. 

## Why? ##

Many years ago I had a vision of creating a memory based model with the page merely being the view following an MVC like convention. To this day we still don't have good cross browsers getter and setter abilities in JS so we have to use methods like the 'set' to trap that change but this was just a thought of what would be a simple dojo like approach.

## Usage ##

### Constructor ###

Pass in a series of keys for the internal storage value and node id's for which node should be bound to.

    binding.bindingActions({
      name: report,
      age: report,
      something: report
    });

Internal 'name' will keep in sync with node with id "name_input"

### Binding Actions ###

A helper method called bindingActions will take in a series of internal labels and bind them to actions that should be triggered on a change. This follows the convention of dojo.connect only the source is taken care of for you so you only need to provide either a function or a source object and method name string.
   
    binding = new data.binding({
      name: "name_input",
      age: "age_input",
      something: "something_input"
    });

Further actions can be bound on an individual level using the connect method.

    binding.connect("something", console, "log");
    binding.connect("something", function(){ /* something else */ } );

### Setting and Getting ###

For the page to update the JS model we need only change the page field. When the JS onchange event is fired it will update the internal model and fire bound methods. To update the model directly use the 'set' method on the binding. This will update the model and also the page's node along with triggering the bound methods as expected. 

    binding = new data.binding({ name: "name_input" })
    binding.set("name","John Smith");

For getting the value back out we can either directly access that value via the get or we can call toJson for a full JSON dump of the current state of the internal data model.

    binding = new data.binding({ name: "name_input" })
    binding.get("name");
    binding.toJson();

## Example ##

    dojo.require("data.binding");

    dojo.addOnLoad(function(){
      binding = new data.binding({
        name: "name_input",
        age: "age_input",
        something: "something_input"
      });

      // connect via mapping of function and binding name
      binding.bindingActions({
        name: report,
        age: report,
        something: report
      });

      // connect via direct connect call passing scope and method
      binding.connect("something", console, "log");

      // connect via direct call passing a function
      binding.connect("something", function(){ console.log("ASD")});
    })