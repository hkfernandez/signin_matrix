class Quote {
  constructor(id, text, author, userId) {
    this.id = id;
    this.text = text;
    this.author = author;
    this.userId = userId;
  }
  getText() {
    return this.text;
  }
  setText(value) {
    this.text = value;
  }
  getAuthor() {
    return this.author;
  }
  setAuthor(value) {
    this.author = value;
  }
  getUser() {
    return this.user;
  }
  seUser(value) {
    this.text = value;
  }
}

module.exports = Quote;
