"use babel";

import { CompositeDisposable } from "event-kit";

class FontSize {
  subscriptions = new CompositeDisposable();
  /*
   *
   */
  activate() {
    const { commands } = inkdrop;
    this.subscriptions.add(
      commands.add(document.body, {
        "font-size:reset": () => this.reset(),
      }),
      commands.add(document.body, {
        "font-size:increase": () => this.increase(),
      }),
      commands.add(document.body, {
        "font-size:decrease": () => this.decrease(),
      })
    );
  }
  /*
   *
   */
  deactivate() {
    this.subscriptions.dispose();
  }
  /*
   *
   */
  increase() {
    this.change(1);
  }
  /*
   *
   */
  decrease() {
    this.change(-1);
  }
  /*
   *
   */
  reset() {
    inkdrop.config.set(
      "editor.fontSize",
      inkdrop.config.get("font-size.editorFontSize")
    );
    inkdrop.config.set(
      "preview.fontSize",
      inkdrop.config.get("font-size.previewFontSize")
    );
  }
  /*
   *
   */
  change(value) {
    let editorFontSize = inkdrop.config.get("editor.fontSize");
    let previewFontSize = inkdrop.config.get("preview.fontSize");

    inkdrop.config.set("editor.fontSize", editorFontSize + value);
    inkdrop.config.set("preview.fontSize", previewFontSize + value);
  }
}

const plugin = new FontSize();

module.exports = {
  config: {
    editorFontSize: {
      title: "editor's default font size",
      type: "integer",
      default: 15,
    },
    previewFontSize: {
      title: "preview's default font size",
      type: "integer",
      default: 15,
    },
  },
  activate() {
    plugin.activate();
  },
  deactivate() {
    plugin.deactivate();
  },
};
