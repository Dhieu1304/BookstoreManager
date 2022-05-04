var DataTypes = require("sequelize").DataTypes;
var _account = require("./account");
var _author = require("./author");
var _bill = require("./bill");
var _book = require("./book");
var _book_author = require("./book_author");
var _book_category = require("./book_category");
var _book_image = require("./book_image");
var _book_stock = require("./book_stock");
var _category = require("./category");
var _customer = require("./customer");
var _import_receipt = require("./import_receipt");
var _import_receipt_detail = require("./import_receipt_detail");
var _publisher = require("./publisher");
var _regulation = require("./regulation");
var _sale_receipt = require("./sale_receipt");
var _sale_receipt_detail = require("./sale_receipt_detail");

function initModels(sequelize) {
  var account = _account(sequelize, DataTypes);
  var author = _author(sequelize, DataTypes);
  var bill = _bill(sequelize, DataTypes);
  var book = _book(sequelize, DataTypes);
  var book_author = _book_author(sequelize, DataTypes);
  var book_category = _book_category(sequelize, DataTypes);
  var book_image = _book_image(sequelize, DataTypes);
  var book_stock = _book_stock(sequelize, DataTypes);
  var category = _category(sequelize, DataTypes);
  var customer = _customer(sequelize, DataTypes);
  var import_receipt = _import_receipt(sequelize, DataTypes);
  var import_receipt_detail = _import_receipt_detail(sequelize, DataTypes);
  var publisher = _publisher(sequelize, DataTypes);
  var regulation = _regulation(sequelize, DataTypes);
  var sale_receipt = _sale_receipt(sequelize, DataTypes);
  var sale_receipt_detail = _sale_receipt_detail(sequelize, DataTypes);

  author.belongsToMany(book, { as: 'book_id_books', through: book_author, foreignKey: "author_id", otherKey: "book_id" });
  book.belongsToMany(author, { as: 'author_id_authors', through: book_author, foreignKey: "book_id", otherKey: "author_id" });
  book.belongsToMany(category, { as: 'category_id_categories', through: book_category, foreignKey: "book_id", otherKey: "category_id" });
  book.belongsToMany(import_receipt, { as: 'report_receipt_id_import_receipts', through: import_receipt_detail, foreignKey: "book_id", otherKey: "report_receipt_id" });
  book.belongsToMany(sale_receipt, { as: 'sale_receipt_id_sale_receipts', through: sale_receipt_detail, foreignKey: "book_id", otherKey: "sale_receipt_id" });
  category.belongsToMany(book, { as: 'book_id_book_book_categories', through: book_category, foreignKey: "category_id", otherKey: "book_id" });
  import_receipt.belongsToMany(book, { as: 'book_id_book_import_receipt_details', through: import_receipt_detail, foreignKey: "report_receipt_id", otherKey: "book_id" });
  sale_receipt.belongsToMany(book, { as: 'book_id_book_sale_receipt_details', through: sale_receipt_detail, foreignKey: "sale_receipt_id", otherKey: "book_id" });
  book_author.belongsTo(author, { as: "author", foreignKey: "author_id"});
  author.hasMany(book_author, { as: "book_authors", foreignKey: "author_id"});
  book_author.belongsTo(book, { as: "book", foreignKey: "book_id"});
  book.hasMany(book_author, { as: "book_authors", foreignKey: "book_id"});
  book_category.belongsTo(book, { as: "book", foreignKey: "book_id"});
  book.hasMany(book_category, { as: "book_categories", foreignKey: "book_id"});
  book_image.belongsTo(book, { as: "book", foreignKey: "book_id"});
  book.hasMany(book_image, { as: "book_images", foreignKey: "book_id"});
  book_stock.belongsTo(book, { as: "book", foreignKey: "book_id"});
  book.hasOne(book_stock, { as: "book_stock", foreignKey: "book_id"});
  import_receipt_detail.belongsTo(book, { as: "book", foreignKey: "book_id"});
  book.hasMany(import_receipt_detail, { as: "import_receipt_details", foreignKey: "book_id"});
  sale_receipt_detail.belongsTo(book, { as: "book", foreignKey: "book_id"});
  book.hasMany(sale_receipt_detail, { as: "sale_receipt_details", foreignKey: "book_id"});
  book_category.belongsTo(category, { as: "category", foreignKey: "category_id"});
  category.hasMany(book_category, { as: "book_categories", foreignKey: "category_id"});
  bill.belongsTo(customer, { as: "customer", foreignKey: "customer_id"});
  customer.hasMany(bill, { as: "bills", foreignKey: "customer_id"});
  sale_receipt.belongsTo(customer, { as: "customer", foreignKey: "customer_id"});
  customer.hasMany(sale_receipt, { as: "sale_receipts", foreignKey: "customer_id"});
  import_receipt_detail.belongsTo(import_receipt, { as: "report_receipt", foreignKey: "report_receipt_id"});
  import_receipt.hasMany(import_receipt_detail, { as: "import_receipt_details", foreignKey: "report_receipt_id"});
  book.belongsTo(publisher, { as: "publisher", foreignKey: "publisher_id"});
  publisher.hasMany(book, { as: "books", foreignKey: "publisher_id"});
  sale_receipt_detail.belongsTo(sale_receipt, { as: "sale_receipt", foreignKey: "sale_receipt_id"});
  sale_receipt.hasMany(sale_receipt_detail, { as: "sale_receipt_details", foreignKey: "sale_receipt_id"});

  return {
    account,
    author,
    bill,
    book,
    book_author,
    book_category,
    book_image,
    book_stock,
    category,
    customer,
    import_receipt,
    import_receipt_detail,
    publisher,
    regulation,
    sale_receipt,
    sale_receipt_detail,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
