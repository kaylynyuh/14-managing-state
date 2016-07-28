(function(module) {
  var articlesController = {};

  Article.createTable();

  articlesController.index = function(ctx, next) {
    articleView.index(ctx.articles);
  };

  // ANSWERED: What does this method do?  What is it's execution path?
  // This method loads by the id context id that is passed into it by routes.js. It passes the context into Article.findWhere, which return an array of objects matching the context id. It then passes that array to articleController.index for rendering.

  articlesController.loadById = function(ctx, next) {
    var articleData = function(theArticleInformation) {
      ctx.articles = theArticleInformation;
      next();
    };

    Article.findWhere('id', ctx.params.id, articleData);
  };

  // ANSWERED: What does this method do?  What is it's execution path?
  // This method takes an author name via context that is passed to it and passes that context into Article.findWhere after replacing the + signs with spaces. Article.findWhere returns an array of articles by authors who match the context name and passes the array to articlesController.index for rendering.
  articlesController.loadByAuthor = function(ctx, next) {
    var authorData = function(articlesByAuthor) {
      ctx.articles = articlesByAuthor;
      next();
    };

    Article.findWhere(
      'author', ctx.params.authorName.replace('+', ' '), authorData
    );
  };

  // COMMENT: What does this method do?  What is it's execution path?
  articlesController.loadByCategory = function(ctx, next) {
    var categoryData = function(articlesInCategory) {
      ctx.articles = articlesInCategory;
      next();
    };

    Article.findWhere('category', ctx.params.categoryName, categoryData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  articlesController.loadAll = function(ctx, next) {
    var articleData = function(allArticles) {
      ctx.articles = Article.all;
      next();
    };

    if (Article.all.length) {
      ctx.articles = Article.all;
      next();
    } else {
      Article.fetchAll(articleData);
    }
  };

  module.articlesController = articlesController;
})(window);
