import { DefaultTheme, DefaultThemeRenderContext, JSX, Options, PageEvent, Reflection, Router } from 'typedoc';

export class MyThemeContext extends DefaultThemeRenderContext {
    constructor(router: Router, theme: DefaultTheme, page: PageEvent<Reflection>, options: Options) {
        super(router, theme, page, options);

        this.footer = () => (
            <footer>
                <p class="tsd-generator">
                    Generated using{' '}
                    <a href="https://typedoc.org/" target="_blank">
                        TypeDoc
                    </a>{' '}
                    with{' '}
                    <a href="https://github.com/jacobhumston/typedoc-neat-theme" target="_blank">
                        typedoc-neat-theme
                    </a>
                    .
                </p>
            </footer>
        );
    }
}
