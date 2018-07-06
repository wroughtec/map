# YourWelcome Code Test

This code test is two parts, and each should take roughly an hour/hour and a half. We are looking for clean code, in a readable format. Stlying is not expected but a bonus (and a little may be required for task 2).

The code should be tested (task 1), and those tests should pass.

You will need a Google Maps API key for task 2, which can be obtained here: https://developers.google.com/maps/documentation/javascript/get-api-key)

The `MapComponent` should be connected by relay, and should accept a `location` prop.

## Getting Started

```npm install``` to install the packages (you may need to run `npm install --update-binary` if you're running a later version of node)

```npm run update-schema && npm run start```

you will be able to access the site: http://localhost:3001
you will be able to access the graph: http://localhost:3001/graphql

here is a basic graph query to input into the graphql
```
{
  viewer {
    properties(sortKey: "address", sortOrder: "asc") {
      address
    }
  }
}
```

## The Code

Both the `Javascript`, and the `sass` should be **linted** (`npm run lint` and `npm run sass-lint` respectively) - please do not alter the lint rules.

The code should be added to a git repository (github, gitlab, bitbucket etc.)

## The Tasks

**Task One**

we have a problem! we are trying to sort our properties by address, but they're not sorted correctly! Our sort function uses lodash `sortBy` (https://lodash.com/docs/4.17.4#sortBy), but it's just not working, time to write a new function that does the job! (read: https://stackoverflow.com/questions/2802341/javascript-natural-sort-of-alphanumerical-strings)

first things first, have a look at the test in `/lib/graph/__tests__/sort.js` and run it by running `npm run test` you'll see it works for one test, but fails for another, the first task is to create/add the new function in to the sort file (`/lib/graph/utils/simpleSort`) and get the tests to pass - add some new tests if you want to be sure it does what you think it should

secondly, we want to be able to change the order on the sort function, so sometimes, it'll be ascending, (1, 2, 3, 4, 5), and sometimes descending (5, 4, 3, 2, 1), this should also be tested in the `/lib/graph/__tests__/sort.js` file

Finally, we need to make it so you can sort the list of addresses in the browser, currently it's sorted by `address, asc` and we need it to be sorted by address, or id, ascending or descending. There are functions being passed in already, they just need using, so your job is to build two simple elements that when changed (could be a drop down, or a radio button, or similar) will change the sort key from `address` to `id` or vice versa, and the sortOrder, from `asc` to `desc` or vice versa

--

**Task Two**

You can access each property, by clicking on the property link in the list.

It currently just shows the address for each property, and we would like it to show a map as well. This will require a new component, which can be shown in the `PropertyPage`

each property has a lat/lng location in the `/lib/graph/utils/properties.js`, for this to be exposed on the front end, we need a new `loction type`, contating a lat/lng in the graph. Once that has been created, rebuild the schema/app (`npm run update-schema && npm run start` again), and you'll be able to see those values in the graph.

They can then be used on the front end, and passed into a component via a relay fragment. This component, should then be able to render a google map with the pin where the property location is. `react-google-maps` (https://github.com/tomchentw/react-google-maps) has already been installed via the package.json.
