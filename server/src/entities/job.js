function init() {
  return class Job {
    constructor(body) {
      const {
        id, title, link, content, isoDate,
      } = body;
      // eslint-disable-next-line no-restricted-globals
      if (typeof id !== 'number' || isNaN(id)) throw new Error('invalid id');
      if (typeof title !== 'string') throw new Error('invalid title');
      if (typeof link !== 'string') throw new Error('invalid link');
      if (typeof content !== 'string') throw new Error('invalid content');
      if (typeof isoDate !== 'string' && !(isoDate instanceof Date)) throw new Error('invalid isoDate');
      this.id = +id;
      this.title = title;
      this.link = link;
      this.content = content;
      this.isoDate = new Date(isoDate);
    }

    getMetaData() {
      return {
        id: this.id,
        title: this.title,
        link: this.link,
        content: this.content,
        isoDate: this.isoDate,
      };
    }
  };
}

module.exports = init;
