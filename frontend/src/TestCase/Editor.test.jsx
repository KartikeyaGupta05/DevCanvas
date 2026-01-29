import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Html from "../Components/Editor/Html.jsx";
import JavaScript from "../Components/Editor/Javascript.jsx";
import Python from "../Components/Editor/Python.jsx";
import C from "../Components/Editor/C.jsx";
import Cpp from "../Components/Editor/Cpp.jsx";
import Java from "../Components/Editor/Java.jsx";
import Image2Text from "../Components/Editor/Image2Text.jsx";
import Voice2Text from "../Components/Editor/Voice2Text.jsx";

/* ================= HTML EDITOR ================= */

describe("HTML Editor", () => {
  test("HTML editor renders", () => {
    render(
      <MemoryRouter>
        <Html />
      </MemoryRouter>
    );
  });

  test("HTML code updates and renders output", () => {
    render(
      <MemoryRouter>
        <Html />
      </MemoryRouter>
    );

    const htmlTextarea = screen.getByTestId("htmlTextarea");
    fireEvent.change(htmlTextarea, {
      target: { value: "<h1>Hello HTML</h1>" },
    });

    expect(htmlTextarea.value).toBe("<h1>Hello HTML</h1>");

    const iframe = screen.getByTestId("result");
    expect(iframe.contentDocument.body.innerHTML).toContain("Hello HTML");
  });

  test("HTML run button exists", () => {
    render(
      <MemoryRouter>
        <Html />
      </MemoryRouter>
    );

    expect(screen.getByTestId("runButton")).toBeInTheDocument();
  });
});

/* ================= JAVASCRIPT EDITOR ================= */

describe("JavaScript Editor", () => {
  test("JavaScript editor renders", () => {
    render(
      <MemoryRouter>
        <JavaScript />
      </MemoryRouter>
    );
  });

  test("JavaScript code input updates", () => {
    render(
      <MemoryRouter>
        <JavaScript />
      </MemoryRouter>
    );

    const textarea = screen.getByTestId("jsTextarea");
    fireEvent.change(textarea, {
      target: { value: 'console.log("Hello JS")' },
    });

    expect(textarea.value).toBe('console.log("Hello JS")');
  });

  test("RUN button exists in JavaScript editor", () => {
    render(
      <MemoryRouter>
        <JavaScript />
      </MemoryRouter>
    );

    expect(screen.getByText("RUN")).toBeInTheDocument();
  });
});

/* ================= PYTHON EDITOR ================= */

describe("Python Editor", () => {
  test("Python editor renders", () => {
    render(
      <MemoryRouter>
        <Python />
      </MemoryRouter>
    );
  });

  test("Python code updates on change", () => {
    render(
      <MemoryRouter>
        <Python />
      </MemoryRouter>
    );

    const textarea = screen.getByPlaceholderText(
      'print("hello DevCanvas Coders")'
    );

    fireEvent.change(textarea, {
      target: { value: 'print("Hello Python")' },
    });

    expect(textarea.value).toBe('print("Hello Python")');
  });
});

/* ================= C EDITOR ================= */

describe("C Editor", () => {
  test("C editor renders", () => {
    render(
      <MemoryRouter>
        <C />
      </MemoryRouter>
    );
  });

  test("C editor updates code input", () => {
    render(
      <MemoryRouter>
        <C />
      </MemoryRouter>
    );

    const textarea = screen.getByPlaceholderText("Start typing C code...");
    fireEvent.change(textarea, {
      target: { value: "int main(){ return 0; }" },
    });

    expect(textarea.value).toBe("int main(){ return 0; }");
  });

  test("RUN button exists in C editor", () => {
    render(
      <MemoryRouter>
        <C />
      </MemoryRouter>
    );

    expect(screen.getByText("RUN")).toBeInTheDocument();
  });
});

/* ================= C++ EDITOR ================= */

describe("C++ Editor", () => {
  test("C++ editor renders", () => {
    render(
      <MemoryRouter>
        <Cpp />
      </MemoryRouter>
    );
  });

  test("C++ editor updates code input", () => {
    render(
      <MemoryRouter>
        <Cpp />
      </MemoryRouter>
    );

    const textarea = screen.getByPlaceholderText("Start typing C++ code...");
    fireEvent.change(textarea, {
      target: { value: "int main(){ return 0; }" },
    });

    expect(textarea.value).toBe("int main(){ return 0; }");
  });
});

/* ================= JAVA EDITOR ================= */

describe("Java Editor", () => {
  test("Java editor renders", () => {
    render(
      <MemoryRouter>
        <Java />
      </MemoryRouter>
    );
  });

  test("Java editor updates code input", () => {
    render(
      <MemoryRouter>
        <Java />
      </MemoryRouter>
    );

    const textarea = screen.getByPlaceholderText("Start typing Java code...");
    fireEvent.change(textarea, {
      target: {
        value: "public class Main { public static void main(String[] a) {} }",
      },
    });

    expect(textarea.value).toContain("public class Main");
  });
});

/* ================= IMAGE TO TEXT ================= */

describe("Image2Text Editor", () => {
  test("Image2Text editor renders", () => {
    render(
      <MemoryRouter>
        <Image2Text />
      </MemoryRouter>
    );
  });
});

/* ================= VOICE TO TEXT ================= */

describe("Voice2Text Editor", () => {
  test("Voice2Text editor renders", () => {
    render(
      <MemoryRouter>
        <Voice2Text />
      </MemoryRouter>
    );
  });
});
