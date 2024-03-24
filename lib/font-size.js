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
        "font-size:reset": this.reset,
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
  reset() {
    const editorFont = inkdrop.config.get("font-size.editorFontSize");
    const previewFont = inkdrop.config.get("font-size.previewFontSize");
    console.log("font-size:reset", editorFont, previewFont);

    inkdrop.config.set(
      "editor.fontSize",
      inkdrop.config.get("font-size.editorFontSize")
    );
    inkdrop.config.set(
      "preview.fontSize",
      inkdrop.config.get("font-size.previewFontSize")
    );
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
