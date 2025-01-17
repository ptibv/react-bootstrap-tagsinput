var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import classnames from 'classnames';
export default function Cancel(props) {
    return (React.createElement("svg", Object.assign({ width: '14', height: '14', viewBox: '0 0 20 20' }, props),
        React.createElement("path", { d: 'M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z' })));
}
export const InputTags = (_a) => {
    var { placeholder, values, onTags, name, className, elementClassName } = _a, rest = __rest(_a, ["placeholder", "values", "onTags", "name", "className", "elementClassName"]);
    const [terms, setTerms] = useState(values || []);
    const [value, setValue] = useState('');
    const [focusIndex, setFocusIndex] = useState(-1);
    const inputRef = useRef(null);
    const forceInputFocus = () => {
        if (inputRef.current && focusIndex === -1) {
            inputRef.current.focus();
        }
    };
    useLayoutEffect(() => {
        if (terms.length === 0) {
            setFocusIndex(-1);
        }
        onTags({ values: terms, name: name });
    }, [terms.length]);
    useEffect(() => {
        setTerms(values || []);
    }, [values]);
    useEffect(() => {
        forceInputFocus();
    }, [focusIndex, inputRef.current]);
    const onchange = (event) => {
        setValue(event.currentTarget.value);
    };
    const onkeydown = (event) => {
        const { key } = event;
        const currentValue = value.trim();
        if (key === 'Tab' && currentValue !== '') {
            event.preventDefault();
            setTerms([...terms, currentValue.replace(',', '')]);
            setValue('');
            setFocusIndex(-1);
        }
    };
    const onkeyup = (event) => {
        const { key } = event;
        const currentValue = value.trim();
        const valueLength = currentValue.length;
        const currentTarget = event.currentTarget.selectionEnd || 0;
        const isEndOfText = currentTarget > valueLength;
        const isStartOfText = currentTarget === 0;
        const isPossibletermsMove = terms.length > 0;
        const isPossibleAddKeys = key === 'Enter' || key === ' ' || key === 'Tab' || key === ',';
        if (isPossibleAddKeys && currentValue !== '') {
            event.preventDefault();
            setTerms([...terms, currentValue.replace(',', '')]);
            setValue('');
            setFocusIndex(-1);
        }
        else if (isStartOfText &&
            (key === 'Backspace' || key === 'ArrowLeft') &&
            isPossibletermsMove) {
            event.preventDefault();
            setFocusIndex(terms.length - 1);
        }
        else if (isEndOfText && key === 'ArrowRight' && isPossibletermsMove) {
            event.preventDefault();
            setFocusIndex(0);
        }
    };
    const handleRemove = (index, focus) => {
        setTerms(terms.filter((_, i) => i !== index));
        if (focus) {
            setFocusIndex(Math.max(focusIndex - 1, 0));
        }
        else {
            forceInputFocus();
        }
    };
    const setSelectedIndex = (index) => {
        if (index < terms.length && index > -1) {
            setFocusIndex(index);
        }
        else {
            setFocusIndex(-1);
        }
    };
    return (React.createElement("div", { className: 'form-control h-auto d-inline-flex flex-wrap' },
        terms.map((item, index) => {
            const focus = focusIndex === index;
            return (React.createElement(Element, { key: `${item}${index}`, value: item, index: index, onRemove: handleRemove, focus: focus, onSelectedIndex: setSelectedIndex, className: elementClassName }));
        }),
        React.createElement("input", Object.assign({ "data-testid": 'input-tags', ref: inputRef, type: 'text', className: classnames('border-0 w-auto flex-fill input-tags', className), placeholder: placeholder, "aria-label": placeholder, value: value, onChange: onchange, onKeyUp: onkeyup, onKeyDown: onkeydown, autoFocus: true, name: name }, rest))));
};
const Element = (props) => {
    const [focus, setFocus] = useState(false);
    const onclick = () => {
        props.onRemove(props.index, focus);
    };
    const ref = useRef(null);
    useLayoutEffect(() => {
        if (ref.current && props.focus) {
            ref.current.focus();
        }
    }, [props.focus]);
    const onkeydown = (event) => {
        const { key } = event;
        event.preventDefault();
        if (key === 'Backspace' || key === 'Delete') {
            props.onRemove(props.index, props.focus);
        }
        else if (key === 'ArrowLeft') {
            props.onSelectedIndex(props.index - 1);
        }
        else if (key === 'ArrowRight') {
            props.onSelectedIndex(props.index + 1);
        }
    };
    return (React.createElement("div", { "data-testid": 'tag-element', ref: ref, tabIndex: 0, className: classnames('badge bg-secondary bg-gradient me-1 pe-1 justify-content-between', props.className), onKeyUp: onkeydown, onFocus: () => {
            setFocus(true);
        }, onBlur: () => {
            setFocus(false);
        } },
        props.value,
        React.createElement("button", { "data-testid": 'tag-clean-element', "aria-label": 'remove path fragment', tabIndex: -1, className: 'border-0 bg-transparent ps-auto pe-0', style: { outline: 0 }, onClick: onclick },
            React.createElement(Cancel, { style: { fill: 'var(--bs-white)', opacity: 1 }, width: 14, height: 14 }))));
};
