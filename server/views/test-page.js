const template = `
<style>
    @scope {
        :root {
            --pico-font-size: 60%;
            --pico-form-element-spacing-vertical: 0.1rem;
            --pico-form-element-spacing-horizontal: 0.5rem;
            --pico-font-weight: 600;
        }
    }
</style>
    <!-- Preview -->
<section id="preview">
    <h2>Preview</h2>
    <p>
        Sed ultricies dolor non ante vulputate hendrerit. Vivamus sit amet suscipit sapien. Nulla
        iaculis eros a elit pharetra egestas.
    </p>
    <form>
        <div class="grid">
        <input
            type="text"
            name="firstname"
            placeholder="First name"
            aria-label="First name"
            required
        />
        <input
            type="email"
            name="email"
            placeholder="Email address"
            aria-label="Email address"
            autocomplete="email"
            required
        />
        <button type="submit">Subscribe</button>
        </div>
        <fieldset>
        <label for="terms">
            <input type="checkbox" role="switch" id="terms" name="terms" />
            I agree to the
            <a href="#" onclick="event.preventDefault()">Privacy Policy</a>
        </label>
        </fieldset>
    </form>
    </section>
    <!-- ./ Preview -->

    <!-- Typography-->
    <section id="typography">
    <h2>Typography</h2>
    <p>
        Aliquam lobortis vitae nibh nec rhoncus. Morbi mattis neque eget efficitur feugiat.
        Vivamus porta nunc a erat mattis, mattis feugiat turpis pretium. Quisque sed tristique
        felis.
    </p>

    <!-- Blockquote-->
    <blockquote>
        "Maecenas vehicula metus tellus, vitae congue turpis hendrerit non. Nam at dui sit amet
        ipsum cursus ornare."
        <footer>
        <cite>- Phasellus eget lacinia</cite>
        </footer>
    </blockquote>

    <!-- Lists-->
    <h3>Lists</h3>
    <ul>
        <li>Aliquam lobortis lacus eu libero ornare facilisis.</li>
        <li>Nam et magna at libero scelerisque egestas.</li>
        <li>Suspendisse id nisl ut leo finibus vehicula quis eu ex.</li>
        <li>Proin ultricies turpis et volutpat vehicula.</li>
    </ul>

    <!-- Inline text elements-->
    <h3>Inline text elements</h3>
    <div class="grid">
        <p><a href="#" onclick="event.preventDefault()">Primary link</a></p>
        <p>
        <a href="#" class="secondary" onclick="event.preventDefault()">Secondary link</a>
        </p>
        <p>
        <a href="#" class="contrast" onclick="event.preventDefault()">Contrast link</a>
        </p>
    </div>
    <div class="grid">
        <p><strong>Bold</strong></p>
        <p><em>Italic</em></p>
        <p><u>Underline</u></p>
    </div>
    <div class="grid">
        <p><del>Deleted</del></p>
        <p><ins>Inserted</ins></p>
        <p><s>Strikethrough</s></p>
    </div>
    <div class="grid">
        <p><small>Small </small></p>
        <p>Text <sub>Sub</sub></p>
        <p>Text <sup>Sup</sup></p>
    </div>
    <div class="grid">
        <p>
        <abbr title="Abbreviation" data-tooltip="Abbreviation">Abbr.</abbr>
        </p>
        <p><kbd>Kbd</kbd></p>
        <p><mark>Highlighted</mark></p>
    </div>

    <!-- Headings-->
    <h3>Heading 3</h3>
    <p>
        Integer bibendum malesuada libero vel eleifend. Fusce iaculis turpis ipsum, at efficitur
        sem scelerisque vel. Aliquam auctor diam ut purus cursus fringilla. Class aptent taciti
        sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
    </p>
    <h4>Heading 4</h4>
    <p>
        Cras fermentum velit vitae auctor aliquet. Nunc non congue urna, at blandit nibh. Donec ac
        fermentum felis. Vivamus tincidunt arcu ut lacus hendrerit, eget mattis dui finibus.
    </p>
    <h5>Heading 5</h5>
    <p>
        Donec nec egestas nulla. Sed varius placerat felis eu suscipit. Mauris maximus ante in
        consequat luctus. Morbi euismod sagittis efficitur. Aenean non eros orci. Vivamus ut diam
        sem.
    </p>
    <h6>Heading 6</h6>
    <p>
        Ut sed quam non mauris placerat consequat vitae id risus. Vestibulum tincidunt nulla ut
        tortor posuere, vitae malesuada tortor molestie. Sed nec interdum dolor. Vestibulum id
        auctor nisi, a efficitur sem. Aliquam sollicitudin efficitur turpis, sollicitudin
        hendrerit ligula semper id. Nunc risus felis, egestas eu tristique eget, convallis in
        velit.
    </p>

    <!-- Medias-->
    <figure>
        <img
        src="https://images.unsplash.com/photo-1473984951266-787b955c9e0b?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Minimal landscape"
        />
        <figcaption>
        Image from
        <a href="https://unsplash.com/photos/a562ZEFKW8I" target="_blank">unsplash.com</a>
        </figcaption>
    </figure>
    </section>
    <!-- ./ Typography-->

    <!-- Buttons-->
    <section id="buttons">
    <h2>Buttons</h2>
    <p>
        <button>Primary</button>
        <button class="secondary">Secondary</button>
        <button class="contrast">Contrast</button>
    </p>
    <p>
        <button class="outline">Primary outline</button>
        <button class="outline secondary">Secondary outline</button>
        <button class="outline contrast">Contrast outline</button>
    </p>
    </section>
    <!-- ./ Buttons -->

    <!-- Form elements-->
    <section id="form">
    <form>
        <h2>Form elements</h2>

        <!-- Search -->
        <label for="search">Search</label>
        <input type="search" id="search" name="search" placeholder="Search" />

        <!-- Text -->
        <label for="text">Text</label>
        <input type="text" id="text" name="text" placeholder="Text" />
        <small>Curabitur consequat lacus at lacus porta finibus.</small>

        <!-- Select -->
        <label for="select">Select</label>
        <select id="select" name="select" required>
        <option value="" selected>Select…</option>
        <option>…</option>
        </select>

        <!-- File browser -->
        <label for="file"
        >File browser
        <input type="file" id="file" name="file" />
        </label>

        <!-- Range slider control -->
        <label for="range"
        >Range slider
        <input type="range" min="0" max="100" value="50" id="range" name="range" />
        </label>

        <!-- States -->
        <div class="grid">
        <label for="valid">
            Valid
            <input type="text" id="valid" name="valid" placeholder="Valid" aria-invalid="false" />
        </label>
        <label for="invalid">
            Invalid
            <input
            type="text"
            id="invalid"
            name="invalid"
            placeholder="Invalid"
            aria-invalid="true"
            />
        </label>
        <label for="disabled">
            Disabled
            <input type="text" id="disabled" name="disabled" placeholder="Disabled" disabled />
        </label>
        </div>

        <div class="grid">
        <!-- Date-->
        <label for="date"
            >Date
            <input type="date" id="date" name="date" />
        </label>

        <!-- Time-->
        <label for="time"
            >Time
            <input type="time" id="time" name="time" />
        </label>

        <!-- Color-->
        <label for="color"
            >Color
            <input type="color" id="color" name="color" value="#0eaaaa" />
        </label>
        </div>

        <div class="grid">
        <!-- Checkboxes -->
        <fieldset>
            <legend><strong>Checkboxes</strong></legend>
            <label for="checkbox-1">
            <input type="checkbox" id="checkbox-1" name="checkbox-1" checked />
            Checkbox
            </label>
            <label for="checkbox-2">
            <input type="checkbox" id="checkbox-2" name="checkbox-2" />
            Checkbox
            </label>
        </fieldset>

        <!-- Radio buttons -->
        <fieldset>
            <legend><strong>Radio buttons</strong></legend>
            <label for="radio-1">
            <input type="radio" id="radio-1" name="radio" value="radio-1" checked />
            Radio button
            </label>
            <label for="radio-2">
            <input type="radio" id="radio-2" name="radio" value="radio-2" />
            Radio button
            </label>
        </fieldset>

        <!-- Switch -->
        <fieldset>
            <legend><strong>Switches</strong></legend>
            <label for="switch-1">
            <input type="checkbox" id="switch-1" name="switch-1" role="switch" checked />
            Switch
            </label>
            <label for="switch-2">
            <input type="checkbox" id="switch-2" name="switch-2" role="switch" />
            Switch
            </label>
        </fieldset>
        </div>

        <!-- Buttons -->
        <input type="reset" value="Reset" onclick="event.preventDefault()" />
        <input type="submit" value="Submit" onclick="event.preventDefault()" />
    </form>
    </section>
    <!-- ./ Form elements-->

    <!-- Tables -->
    <section id="tables">
    <h2>Tables</h2>
    <div class="overflow-auto">
        <table class="striped">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Heading</th>
            <th scope="col">Heading</th>
            <th scope="col">Heading</th>
            <th scope="col">Heading</th>
            <th scope="col">Heading</th>
            <th scope="col">Heading</th>
            <th scope="col">Heading</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <th scope="row">1</th>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
            </tr>
            <tr>
            <th scope="row">2</th>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
            </tr>
            <tr>
            <th scope="row">3</th>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
            </tr>
        </tbody>
        </table>
    </div>
    </section>
    <!-- ./ Tables -->

    <!-- Modal -->
    <section id="modal">
    <h2>Modal</h2>
    <button class="contrast" data-target="modal-example" onclick="toggleModal(event)">
        Launch demo modal
    </button>
    </section>
    <!-- ./ Modal -->

    <!-- Accordions -->
    <section id="accordions">
    <h2>Accordions</h2>
    <details>
        <summary>Accordion 1</summary>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque urna diam,
        tincidunt nec porta sed, auctor id velit. Etiam venenatis nisl ut orci consequat, vitae
        tempus quam commodo. Nulla non mauris ipsum. Aliquam eu posuere orci. Nulla convallis
        lectus rutrum quam hendrerit, in facilisis elit sollicitudin. Mauris pulvinar pulvinar
        mi, dictum tristique elit auctor quis. Maecenas ac ipsum ultrices, porta turpis sit
        amet, congue turpis.
        </p>
    </details>
    <details open>
        <summary>Accordion 2</summary>
        <ul>
        <li>Vestibulum id elit quis massa interdum sodales.</li>
        <li>Nunc quis eros vel odio pretium tincidunt nec quis neque.</li>
        <li>Quisque sed eros non eros ornare elementum.</li>
        <li>Cras sed libero aliquet, porta dolor quis, dapibus ipsum.</li>
        </ul>
    </details>
    </section>
    <!-- ./ Accordions -->

    <!-- Article-->
    <article id="article">
    <h2>Article</h2>
    <p>
        Nullam dui arcu, malesuada et sodales eu, efficitur vitae dolor. Sed ultricies dolor non
        ante vulputate hendrerit. Vivamus sit amet suscipit sapien. Nulla iaculis eros a elit
        pharetra egestas. Nunc placerat facilisis cursus. Sed vestibulum metus eget dolor pharetra
        rutrum.
    </p>
    <footer>
        <small>Duis nec elit placerat, suscipit nibh quis, finibus neque.</small>
    </footer>
    </article>
    <!-- ./ Article-->

    <!-- Group -->
    <section id="group">
    <h2>Group</h2>
    <form>
        <fieldset role="group">
        <input name="email" type="email" placeholder="Enter your email" autocomplete="email" />
        <input type="submit" value="Subscribe" />
        </fieldset>
    </form>
    </section>
    <!-- ./ Group -->

    <!-- Progress -->
    <section id="progress">
    <h2>Progress bar</h2>
    <progress id="progress-1" value="25" max="100"></progress>
    <progress id="progress-2"></progress>
    </section>
    <!-- ./ Progress -->

    <!-- Loading -->
    <section id="loading">
    <h2>Loading</h2>
    <article aria-busy="true"></article>
    <button aria-busy="true">Please wait…</button>
    </section>
    <!-- ./ Loading -->
</main>
<!-- ./ Main -->

<section id="text">
    <header><h1>Text</h1></header>
    <article id="text__headings">
        <header>
            <h2>Headings</h2>
        </header>
        <div>
            <h1>Heading 1</h1>
            <h2>Heading 2</h2>
            <h3>Heading 3</h3>
            <h4>Heading 4</h4>
            <h5>Heading 5</h5>
            <h6>Heading 6</h6>
        </div>
        <footer><p><a href="#top">[Top]</a></p></footer>
    </article>
    <article id="text__paragraphs">
        <header><h2>Paragraphs</h2></header>
        <div>
            <p>
                A paragraph (from the Greek paragraphos, “to write beside” or “written beside”) is a self-contained unit of a discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any
                language, paragraphs are usually an expected part of formal writing, used to organize longer prose.
            </p>
        </div>
        <footer><p><a href="#top">[Top]</a></p></footer>
    </article>
    <article id="text__lists">
        <header><h2>Lists</h2></header>
        <div>
            <h3>Definition list</h3>
            <dl>
                <dt>Definition List Title</dt>
                <dd>This is a definition list division.</dd>
            </dl>
            <h3>Ordered List</h3>
            <ol type="1">
                <li>List Item 1</li>
                <li>
                    List Item 2
                    <ol type="A">
                        <li>List Item 1</li>
                        <li>
                            List Item 2
                            <ol type="a">
                                <li>List Item 1</li>
                                <li>
                                    List Item 2
                                    <ol type="I">
                                        <li>List Item 1</li>
                                        <li>
                                            List Item 2
                                            <ol type="i">
                                                <li>List Item 1</li>
                                                <li>List Item 2</li>
                                                <li>List Item 3</li>
                                            </ol>
                                        </li>
                                        <li>List Item 3</li>
                                    </ol>
                                </li>
                                <li>List Item 3</li>
                            </ol>
                        </li>
                        <li>List Item 3</li>
                    </ol>
                </li>
                <li>List Item 3</li>
            </ol>
            <h3>Unordered List</h3>
            <ul>
                <li>List Item 1</li>
                <li>
                    List Item 2
                    <ul>
                        <li>List Item 1</li>
                        <li>
                            List Item 2
                            <ul>
                                <li>List Item 1</li>
                                <li>
                                    List Item 2
                                    <ul>
                                        <li>List Item 1</li>
                                        <li>
                                            List Item 2
                                            <ul>
                                                <li>List Item 1</li>
                                                <li>List Item 2</li>
                                                <li>List Item 3</li>
                                            </ul>
                                        </li>
                                        <li>List Item 3</li>
                                    </ul>
                                </li>
                                <li>List Item 3</li>
                            </ul>
                        </li>
                        <li>List Item 3</li>
                    </ul>
                </li>
                <li>List Item 3</li>
            </ul>
        </div>
        <footer><p><a href="#top">[Top]</a></p></footer>
    </article>
    <article id="text__blockquotes">
        <header><h1>Blockquotes</h1></header>
        <div>
            <blockquote>
                <p>A block quotation (also known as a long quotation or extract) is a quotation in a written document, that is set off from the main text as a paragraph, or block of text.</p>
                <p>It is typically distinguished visually using indentation and a different typeface or smaller size quotation. It may or may not include a citation, usually placed at the bottom.</p>
                <cite><a href="#!">Said no one, ever.</a></cite>
            </blockquote>
        </div>
        <footer><p><a href="#top">[Top]</a></p></footer>
    </article>
    <article id="text__details">
        <header><h1>Details / Summary</h1></header>
        <details>
            <summary>Expand for details</summary>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, odio! Odio natus ullam ad quaerat, eaque necessitatibus, aliquid distinctio similique voluptatibus dicta consequuntur animi. Quaerat facilis quidem unde eos! Ipsa.</p>
        </details>
        <footer><p><a href="#top">[Top]</a></p></footer>
    </article>
    <article id="text__address">
        <header><h1>Address</h1></header>
        <address>
            Written by <a href="mailto:webmaster@example.com">Jon Doe</a>.<br>
            Visit us at:<br>
            Example.com<br>
            Box 564, Disneyland<br>
            USA
        </address>
        <footer><p><a href="#top">[Top]</a></p></footer>
    </article>
    <article id="text__hr">
        <header><h2>Horizontal rules</h2></header>
        <div>
            <hr>
        </div>
        <footer><p><a href="#top">[Top]</a></p></footer>
    </article>
    <article id="text__tables">
        <header><h2>Tabular data</h2></header>
        <table>
            <caption>Table Caption</caption>
            <thead>
                <tr>
                    <th>Table Heading 1</th>
                    <th>Table Heading 2</th>
                    <th>Table Heading 3</th>
                    <th>Table Heading 4</th>
                    <th>Table Heading 5</th>
                </tr>
            </thead>
            <tfoot>
                <tr>
                    <th>Table Footer 1</th>
                    <th>Table Footer 2</th>
                    <th>Table Footer 3</th>
                    <th>Table Footer 4</th>
                    <th>Table Footer 5</th>
                </tr>
            </tfoot>
            <tbody>
                <tr>
                    <td>Table Cell 1</td>
                    <td>Table Cell 2</td>
                    <td>Table Cell 3</td>
                    <td>Table Cell 4</td>
                    <td>Table Cell 5</td>
                </tr>
                <tr>
                    <td>Table Cell 1</td>
                    <td>Table Cell 2</td>
                    <td>Table Cell 3</td>
                    <td>Table Cell 4</td>
                    <td>Table Cell 5</td>
                </tr>
                <tr>
                    <td>Table Cell 1</td>
                    <td>Table Cell 2</td>
                    <td>Table Cell 3</td>
                    <td>Table Cell 4</td>
                    <td>Table Cell 5</td>
                </tr>
                <tr>
                    <td>Table Cell 1</td>
                    <td>Table Cell 2</td>
                    <td>Table Cell 3</td>
                    <td>Table Cell 4</td>
                    <td>Table Cell 5</td>
                </tr>
            </tbody>
        </table>
        <footer><p><a href="#top">[Top]</a></p></footer>
    </article>
    <article id="text__code">
        <header><h2>Code</h2></header>
        <div>
            <p>
                <strong>Keyboard input:</strong>
                <kbd>Cmd</kbd>
            </p>
            <p>
                <strong>Inline code:</strong>
                <code>&lt;div&gt;code&lt;/div&gt;</code>
            </p>
            <p>
                <strong>Sample output:</strong>
                <samp>This is sample output from a computer program.</samp>
            </p>
            <h2>Pre-formatted text</h2>
            <pre>
P R E F O R M A T T E D T E X T
! " # $ % &amp; ' ( ) * + , - . /
0 1 2 3 4 5 6 7 8 9 : ; &lt; = &gt; ?
@ A B C D E F G H I J K L M N O
P Q R S T U V W X Y Z [ \ ] ^ _
\` a b c d e f g h i j k l m n o
p q r s t u v w x y z { | } ~ </pre>
        </div>
        <footer><p><a href="#top">[Top]</a></p></footer>
    </article>
    <article id="text__inline">
        <header><h2>Inline elements</h2></header>
        <div>
            <p><a href="#!">This is a text link</a>.</p>
            <p><strong>Strong is used to indicate strong importance.</strong></p>
            <p><em>This text has added emphasis.</em></p>
            <p>The <b>b element</b> is stylistically different text from normal text, without any special importance.</p>
            <p>The <i>i element</i> is text that is offset from the normal text.</p>
            <p>The <u>u element</u> is text with an unarticulated, though explicitly rendered, non-textual annotation.</p>
            <p>
                <del>This text is deleted</del> and <ins>This text is inserted</ins>.
            </p>
            <p><s>This text has a strikethrough</s>.</p>
            <p>Superscript<sup>®</sup>.</p>
            <p>Subscript for things like H<sub>2</sub>O.</p>
            <p><small>This small text is small for fine print, etc.</small></p>
            <p>Abbreviation: <abbr title="HyperText Markup Language">HTML</abbr></p>
            <p><q cite="https://developer.mozilla.org/en-US/docs/HTML/Element/q">This text is a short inline quotation.</q></p>
            <p><cite>This is a citation.</cite></p>
            <p>The <dfn>dfn element</dfn> indicates a definition.</p>
            <p>The <mark>mark element</mark> indicates a highlight.</p>
            <p>
                The <var>variable element</var>, such as <var>x</var> = <var>y</var>.
            </p>
            <p>The time element: <time datetime="2013-04-06T12:32+00:00">2 weeks ago</time></p>
        </div>
        <footer><p><a href="#top">[Top]</a></p></footer>
    </article>
</section>
<section id="forms">
    <header><h2>Form elements</h2></header>
    <form>
        <fieldset id="forms__input">
            <legend>Input fields</legend>
            <p>
                <label for="input__text">Text Input</label> <input id="input__text" type="text" placeholder="Text Input">
            </p>
            <p>
                <label for="input__password">Password</label> <input id="input__password" type="password" placeholder="Type your Password">
            </p>
            <p>
                <label for="input__webaddress">Web Address</label> <input id="input__webaddress" type="url" placeholder="https://yoursite.com">
            </p>
            <p>
                <label for="input__emailaddress">Email Address</label> <input id="input__emailaddress" type="email" placeholder="name@email.com">
            </p>
            <p>
                <label for="input__phone">Phone Number</label> <input id="input__phone" type="tel" placeholder="(999) 999-9999">
            </p>
            <p>
                <label for="input__search">Search</label> <input id="input__search" type="search" placeholder="Enter Search Term">
            </p>
            <p>
                <label for="input__text2">Number Input</label> <input id="input__text2" type="number" placeholder="Enter a Number">
            </p>
            <p>
                <label for="input__file">File Input</label> <input id="input__file" type="file">
            </p>
        </fieldset>
        <p><a href="#top">[Top]</a></p>
        <fieldset id="forms__select">
            <legend>Select menus</legend>
            <p>
                <label for="select">Select</label>
                <select id="select">
                    <optgroup label="Option Group">
                        <option>Option One</option>
                        <option>Option Two</option>
                        <option>Option Three</option>
                    </optgroup>
                </select>
            </p>
            <p>
                <label for="select_multiple">Select (multiple)</label>
                <select id="select_multiple" multiple="multiple">
                    <optgroup label="Option Group">
                        <option>Option One</option>
                        <option>Option Two</option>
                        <option>Option Three</option>
                    </optgroup>
                </select>
            </p>
        </fieldset>
        <p><a href="#top">[Top]</a></p>
        <fieldset id="forms__checkbox">
            <legend>Checkboxes</legend>
            <ul>
                <li><label for="checkbox1"><input id="checkbox1" name="checkbox" type="checkbox" checked="checked"> Choice A</label></li>
                <li><label for="checkbox2"><input id="checkbox2" name="checkbox" type="checkbox"> Choice B</label></li>
                <li><label for="checkbox3"><input id="checkbox3" name="checkbox" type="checkbox"> Choice C</label></li>
            </ul>
        </fieldset>
        <p><a href="#top">[Top]</a></p>
        <fieldset id="forms__radio">
            <legend>Radio buttons</legend>
            <ul>
                <li><label for="radio1"><input id="radio1" name="radio" type="radio" checked="checked"> Option 1</label></li>
                <li><label for="radio2"><input id="radio2" name="radio" type="radio"> Option 2</label></li>
                <li><label for="radio3"><input id="radio3" name="radio" type="radio"> Option 3</label></li>
            </ul>
        </fieldset>
        <p><a href="#top">[Top]</a></p>
        <fieldset id="forms__textareas">
            <legend>Textareas</legend>
            <p>
                <label for="textarea">Textarea</label> <textarea id="textarea" rows="8" cols="48" placeholder="Enter your message here"></textarea>
            </p>
        </fieldset>
        <p><a href="#top">[Top]</a></p>
        <fieldset id="forms__html5">
            <legend>HTML5 inputs</legend>
            <p>
                <label for="ic">Color input</label> <input type="color" id="ic" value="#000000">
            </p>
            <p>
                <label for="in">Number input</label> <input type="number" id="in" min="0" max="10" value="5">
            </p>
            <p>
                <label for="ir">Range input</label> <input type="range" id="ir" value="10">
            </p>
            <p>
                <label for="idd">Date input</label> <input type="date" id="idd" value="1970-01-01">
            </p>
            <p>
                <label for="idm">Month input</label> <input type="month" id="idm" value="1970-01">
            </p>
            <p>
                <label for="idw">Week input</label> <input type="week" id="idw" value="1970-W01">
            </p>
            <p>
                <label for="idt">Datetime input</label> <input type="datetime" id="idt" value="1970-01-01T00:00:00Z">
            </p>
            <p>
                <label for="idtl">Datetime-local input</label> <input type="datetime-local" id="idtl" value="1970-01-01T00:00">
            </p>
            <p>
                <label for="idl">Datalist</label>
                <input type="text" id="idl" list="example-list">
                <datalist id="example-list">
                    <option value="Example #1" />
                    <option value="Example #2" />
                    <option value="Example #3" />
                </datalist>
            </p>
        </fieldset>
        <p><a href="#top">[Top]</a></p>
        <fieldset id="forms__action">
            <legend>Action buttons</legend>
            <p>
                <input type="submit" value="<input type=submit>">
                <input type="button" value="<input type=button>">
                <input type="reset" value="<input type=reset>">
                <input type="submit" value="<input disabled>" disabled>
            </p>
            <p>
                <button type="submit">&lt;button type=submit&gt;</button>
                <button type="button">&lt;button type=button&gt;</button>
                <button type="reset">&lt;button type=reset&gt;</button>
                <button type="button" disabled>&lt;button disabled&gt;</button>
            </p>
        </fieldset>
        <p><a href="#top">[Top]</a></p>
    </form>
</section>
<section id="embedded">
    <header><h2>Embedded content</h2></header>
    <article id="embedded__images">
        <header><h2>Images</h2></header>
        <div>
            <h3>Plain <code>&lt;img&gt;</code> element</h3>
            <p><img src="https://plus.unsplash.com/premium_photo-1707353402057-c95bdddb5b39?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Photo of a kitten"></p>
            <h3>
                <code>&lt;figure&gt;</code> element with <code>&lt;img&gt;</code> element
            </h3>
            <figure><img src="https://plus.unsplash.com/premium_photo-1707353402057-c95bdddb5b39?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Photo of a kitten"></figure>
            <h3>
                <code>&lt;figure&gt;</code> element with <code>&lt;img&gt;</code> and <code>&lt;figcaption&gt;</code> elements
            </h3>
            <figure>
                <img src="https://plus.unsplash.com/premium_photo-1707353402057-c95bdddb5b39?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Photo of a kitten">
                <figcaption>Here is a caption for this image.</figcaption>
            </figure>
            <h3>
                <code>&lt;figure&gt;</code> element with a <code>&lt;picture&gt;</code> element
            </h3>
            <figure>
                <picture>
                    <source srcset="https://plus.unsplash.com/premium_photo-1707353402057-c95bdddb5b39?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" media="(min-width: 800px)">
                    <img src="https://plus.unsplash.com/premium_photo-1707353402057-c95bdddb5b39?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Photo of a kitten" />
                </picture>
            </figure>
        </div>
        <footer><p><a href="#top">[Top]</a></p></footer>
    </article>
    <article id="embedded__bgimages">
        <header><h2>Background images</h2></header>
        <div style="background-image: url("https://plus.unsplash.com/premium_photo-1707353402057-c95bdddb5b39?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"); width: 300px; height: 300px"></div>
        <footer><p><a href="#top">[Top]</a></p></footer>
    </article>
    <article id="embedded__audio">
        <header><h2>Audio</h2></header>
        <div><audio controls="">audio</audio></div>
        <footer><p><a href="#top">[Top]</a></p></footer>
    </article>
    <article id="embedded__video">
        <header><h2>Video</h2></header>
        <div><video controls="">video</video></div>
        <footer><p><a href="#top">[Top]</a></p></footer>
    </article>
    <article id="embedded__canvas">
        <header><h2>Canvas</h2></header>
        <div><canvas>canvas</canvas></div>
        <footer><p><a href="#top">[Top]</a></p></footer>
    </article>
    <article id="embedded__meter">
        <header><h2>Meter</h2></header>
        <div><meter value="2" min="0" max="10">2 out of 10</meter></div>
        <footer><p><a href="#top">[Top]</a></p></footer>
    </article>
    <article id="embedded__progress">
        <header><h2>Progress</h2></header>
        <div><progress>progress</progress></div>
        <footer><p><a href="#top">[Top]</a></p></footer>
    </article>
    <article id="embedded__svg">
        <header><h2>Inline SVG</h2></header>
        <div><svg width="100px" height="100px"><circle cx="100" cy="100" r="100" fill="#1fa3ec"></circle></svg></div>
        <footer><p><a href="#top">[Top]</a></p></footer>
    </article>
    <article id="embedded__iframe">
        <header><h2>IFrame</h2></header>
        <div><iframe src="public/style.css" height="300"></iframe></div>
        <footer><p><a href="#top">[Top]</a></p></footer>
    </article>
    <article id="embedded__embed">
        <header><h2>Embed</h2></header>
        <div><embed src="public/style.css" height="300"></div>
        <footer><p><a href="#top">[Top]</a></p></footer>
    </article>
    <article id="embedded__object">
        <header><h2>Object</h2></header>
        <div><object data="public/style.css" height="300"></object></div>
        <footer><p><a href="#top">[Top]</a></p></footer>
    </article>
</section>
`

export function view(router, { eta }) {
    router.get('/', async (ctx) => {
        ctx.response.render(template)
    })
}
