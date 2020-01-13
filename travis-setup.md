# Travis Setup

Setting up the infrastructure for Continuous Integration (CI) takes some time but is well worth the time that would be saved from doing commits, unit tests, linting, and making builds manually (among other things).

Travis is a CI (Continuous) service which simply means it an automated process.


Notice that CI tools like Travis are _not_ the same as software products like Gulp or SASS.

In this activity we will

1. Set up the project repo with Travis CI
2. Ensure that linting passes on all commits before they can be merged into master
3. Ensure that all unit tests pass before they can be merged to master

It is recommended that before you actually apply the test instructions to your project repo, that you _practice_ with a test repository first.


A typical workflow with Travis, Github and Heroku goes like this:

* A commit is pushed to GitHub

* Travis build is triggered and it checks if the test is passing or failing.

* If all tests pass, then Travis will proceed with pushing to Heroku.

You will ultimately implement these steps to automate both building and unit testing processes.

## Instructions

* It is recommended that all team members practice the techniques learned in this demo _in a test repo_, but for a team's project, only the owner of the project repo should complete this activity, other group members should observe and provide input where needed.

### Creating a Repository and (Optional) Protecting Master

* Before we can set up Travis, we can configure the project repo to protect the master branch.

* If you have not created a repo (for your project, or just to test this out) then create a project.

* Create a dummy README.md or some test files.

* Push those test files to your remote copy of _master_

* Navigate to the repo's page, then click the "Settings" tab.

* Select "Branches" from the left sidebar.

* Under "Branch protection rules", click "Add Rule"

* For "Branch name pattern" , choose "master". The page should display ""

* Check off the following options:

  * "Protect this branch"

  * "Require pull request reviews before merging"

  * "Include administrators"

  * "Require status checks to pass before merging"

  * "Require branches to be up to date before merging"

* Click "Save changes"


*Note*: If you have protected the master branch, then you will have to approve merge requests before Travis takes over and automates from master.

### Connect Your Github Repository to Heroku

Follow the instructions in the [HerokuGuide.pdf](HerokuGuide.pdf) to connect your github account to Heroku.

Confirm that you can

a) make a commit to master, then
b) use the heroku CLI to upload contents to your "dyno" (server) upon Heroku
c) see the contents of the sample server.js file in action (see [server.js](server.js) source code)

```
/* server.js main file */
const express = require('express');

const app = express();

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
  // eslint-disable-next-line no-console
  console.log('req = \n', req);
  res.send('Test CI with Travis 1.0');
});

const server = app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('app running on port 3001');
});

// eslint-disable-next-line no-console
console.log('server = ', server);

module.exports = server;
```


### Associate Travis with your Github Repository

* Navigate to <https://github.com/marketplace/travis-ci>.

* Select the option to "Set up a new plan" and choose the $0 "Open Source" plan when prompted.

* Click "Install it for free" and then on the next page click "Complete order and begin installation".

* On the next page select the radio button that reads "Only select repositories".

* From the "Select repositories" dropdown, choose your project repo.

* Click the "Install" button to complete the process

### Part 3(b): Ensuring that your Github is connected to the Travis via the GitHub Plugin for Travis

Browse to <https://github.com/marketplace/travis-ci> and install the Travis CI App from the GitHub Marketplace

Make sure you install the "Open Source" Pricing Version.

### Part 4: Install Heroku and Travis CLIs

Next, you will install the appropriate CLIs for usage in your project.

This demo assumes that you have installed Heroku CLI, described earlier. If not, go to

<https://devcenter.heroku.com/articles/heroku-cli#download-and-install>

and proceed to install the Heroku CLI for your operating system

Next, you will need the Travis CLI. The Travis CLI (at this point in time) requires the _Ruby_ programming language / environment to be installed.

The instructions to install the Travis CLI are at

<https://github.com/travis-ci/travis.rb#installation>

The results should look similar to the image below.

![Screenshot_2019-05-12 -9.36.28-PM.png](images/Screenshot_2019-05-12%20-9.36.28-PM.png)


Additional notes:

Windows Users don't have Ruby installed natively. So these users have to install Ruby first and can do so via RubyInstaller, at

<https://rubyinstaller.org/>

Mac Users should install Homebrew (it's a backup option, to update the operating system or Ruby), the package manager for OS X. The one-line instruction to install Homebrew can be found at

<https://brew.sh/>

If you are a Mac user and you have fresh installation of Mac OS X, you may also have to install the XCode command line development tools as well. If this is the case, then perform the following command at the terminal

```
xcode-select --install
```

Once you have installed any prerequisites for your operating system, proceed with installing the Travis CLI, by entering the command:

```
gem install travis -v 1.8.10 --no-rdoc --no-ri
```

Then confirm it is all installed by testing out the version number for travis CLI

```
travis version
```

### Configuring and Testing ESLint

Now that you (hopefully) have everything Travis, Heroku, and Github installed, begin to set up ESlint for unit Testing.

In your project (if you have not done so already)

```
npm install -g eslint
```

then

```
eslint --init
```

and answer the questions accordingly:

![Screenshot 2019-05-12 00.12.15.png](images/Screenshot_2019-05-12%2000.12.15.png)

(choose yes for the last option as well)

#### ESLint Installation troubleshooting

Having problems?

(Mac) Try installing eslint with _sudo_ privileges

(Windows / Mac)
Install eslint globally, and install the syntax style libraries globally

```
npm install -g eslint # should have done this already
npm install -g eslint-config-airbnb-base@^13.1.0
npm install -g eslint-plugin-import@^2.17.2
```

(Windows)

You may need to add the location of the _ESlint executable_ that you installed using npm install (above) to the Windows OS PATH Environment Variable.



### Enabling Continuous Integration

The .travis.yml file instructs Travis on what to build. the language option can be whatever language your app is running in and the "node_js": "stable" indicates Travis should use a stable version of node. You can also cache your node_modules directory on Travis to avoid installing all dependencies every time a build is triggered but rather it updates packages that has newer versions.


Steps:

1. Assuming you have a Travis Account, login through the terminal using ```travis login --org ``` entering your github username and password to identify yourself.
2. Run ```travis init node_js .travis.yml --force -i -I --org```. This creates the .travis.yml file with Node JS as the main programming language
3. Open the _.travis.yml_ file and add the additional settings related to Node (add the yaml code at the end of the file, below the currently added lines)

```
npm: true
cache:
  directories:
  - node_modules
```

as well, remove the following settings from ```node_js:``` versions

```
- '6'
- '4'
```

leaving only stable version.


4. Setup Travis with Heroku using the travis CLI ```travis setup heroku```

When asked to Deploy only from _(your github account name) / (your repo name)_ enter _yes_

when asked to _Encrypt API Key_ choose _yes_

This should also update your _.travis.yml_ file



Notes: You may get warnings that look like this:

```
Ignoring fast_blank-1.0.0 because its extensions are not built.  Try: gem pristine fast_blank --version 1.0.0
Ignoring ffi-1.9.25 because its extensions are not built.  Try: gem pristine ffi --version 1.9.25
Ignoring gem-wrappers-1.4.0 because its extensions are not built.  Try: gem pristine gem-wrappers --version 1.4.0
Ignoring sassc-2.0.0 because its extensions are not built.  Try: gem pristine sassc --version 2.0.0
```

Like Node and NPM they are just _warnings_. Your option to install them. On a new system where Ruby was just recently installed, it is unlikely to cause conflicts.

5. Prior to the next step, you may wish to observe the build being committed and the heroku environment being setup for you. Brose to https://travis-ci.org and login (if you have not done so already). Then proceed to click on the _Dashboard_ menu item and under _Active Repositories_ click on the link to visit your Travis repository home page. It will likely say "No Builds for this Repository" (as you had not made a build yet).
6. Try to commit your changed with the following commands

```
git add (name of file or .)
git commit -m "git message"
git push
```

Of course, select a file to commit (or all of them), enter an appropriate message that describes the push, and go ahead and push.

At this point, if the option was implemented to approve Merge / Pull Requests to Master first, have a person review the changes and approve the change to be committed to Master.

Once the changes are committed to Master, The Travis WebHook / Plugin should take over and notify Travis that there are updated files and a new build needs to be created and served to Heroku.

7. Observe the changes for your repository in your Travis Dashboard. Hopefully you will get a success Message!






## Miscellaneous Notes ( to add or remove)

Create a remote reference to your repo

```
heroku git:remote -a rails-test-app-article
```

To view an auth token

```
heroku auth:token

```

cat ~/.netrc