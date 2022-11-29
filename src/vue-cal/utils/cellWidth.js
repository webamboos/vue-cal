import { debounce } from 'lodash'

export const MinCellWidth = {
  data: {
    headingsWidth: [],
  },
  methods: {
    setDebounced: debounce(function (value) {
      this.headingsWidth = {
        ...this.headingsWidth,
        [value.date]: value.width,
      };
      return this.headingsWidth
    }, 50),

    setHeadingsWidth(value) {
      this.setDebounced(value)
    },
  }
};
