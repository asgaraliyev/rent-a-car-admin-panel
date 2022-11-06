import { Meteor } from 'meteor/meteor';
import { LinksCollection } from '/imports/api/links';
import {WebApp} from "meteor/webapp"
import main_html from './main_html';
import head_html from './head_html';
import { body_html } from './body_html';
import { index_html } from './pages/index_html';
import { cars_html } from './pages/cars_html';
import "../imports/api/files/collection"
import "../imports/api/files/publications"
import "../imports/api/products/collection"
import "../imports/api/products/methods"
import "../imports/api/products/publications"
function indexController(req, res, next)  {
  res.writeHead(200);
  res.end(main_html(
    {
      head:head_html(),
      body:body_html({children:index_html()})
    }
  ));
}
WebApp.connectHandlers.use('/home',indexController );
WebApp.connectHandlers.use('/index',indexController );
WebApp.connectHandlers.use('/cars', (req, res, next) => {
  res.writeHead(200);
  res.end(main_html(
    {
      head:head_html(),
      body:body_html({children:cars_html()})
    }
  ));
});

function insertLink({ title, url }) {
  LinksCollection.insert({title, url, createdAt: new Date()});
}

Meteor.startup(() => {
  // If the Links collection is empty, add some data.
  if (LinksCollection.find().count() === 0) {
    insertLink({
      title: 'Do the Tutorial',
      url: 'https://www.meteor.com/tutorials/react/creating-an-app'
    });

    insertLink({
      title: 'Follow the Guide',
      url: 'http://guide.meteor.com'
    });

    insertLink({
      title: 'Read the Docs',
      url: 'https://docs.meteor.com'
    });

    insertLink({
      title: 'Discussions',
      url: 'https://forums.meteor.com'
    });
  }
});
