const contentsStore = {
  _currIdx: 3,
  _data: [
    {
      idx: 1,
      title: '안녕하세요',
      text: '안녕하시렵니까<script>alert("hello world");</script>',
      author: '이택수',
      publishedDate: new Date(),
      currentsCommentsIdx: 2,
      comments: [
        {idx: 1, text: '댓글 테스트이다.', author: '테스트', publishedDate: new Date()},
      ],
    },
    {
      idx: 2,
      title: '안녕 디지몬',
      text: '안녕하시렵니까. 디지몬 친구들',
      author: '테스트',
      publishedDate: new Date(),
      currentsCommentsIdx: 1,
      comments: [

      ],
    }
  ],
  getAll() {
    return this._data;
  },
  getOne(idx) {
    return this._data.filter((d) => (d.idx === parseInt(idx)))[0];
  },
  add(title, text, author) {
    this._data.push({
      idx: this._currIdx,
      title, text, author,
      publishedDate: new Date(),
      currentsCommentsIdx: 1,
      comments: [],
    });

    this._currIdx++;
  },
  remove(author) {
    const idx = this._data.findIndex(author);
    this._data.splice(idx, 1);
  },
  addComment(contentsIdx, text, author) {
    const findIdx = this._data.findIndex((d) => d.idx === parseInt(contentsIdx));
    this._data[findIdx].comments.push({
      idx: this._data[findIdx].currentsCommentsIdx,
      text, author,
      publishedDate: new Date(),
    });

    this._data[findIdx].currentsCommentsIdx++; 
  }
}

module.exports = {
  contentsStore,
}

