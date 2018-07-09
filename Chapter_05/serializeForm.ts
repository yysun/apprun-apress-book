export default function<T>(form) {
  let obj = {};
  if (typeof form == 'object' && form.nodeName == 'FORM') {
    for (let i = 0; i < form.elements.length; i++) {
      const field = form.elements[i];
      const name = field.name || field.id;
      if (
        name &&
        field.type != 'file' &&
        field.type != 'reset' &&
        field.type != 'submit' &&
        field.type != 'button'
      ) {
        if (field.type == 'select-multiple') {
          obj[name] = '';
          let tempvalue = '';
          for (let j = 0; j < form.elements[i].options.length; j++) {
            if (field.options[j].selected) tempvalue += field.options[j].value + ';';
          }
          if (tempvalue.charAt(tempvalue.length - 1) === ';')
            obj[name] = tempvalue.substring(0, tempvalue.length - 1);
        } else if ((field.type != 'checkbox' && field.type != 'radio') || field.checked) {
          obj[name] = field.value;
        }
      }
    }
  }
  return obj as T;
}