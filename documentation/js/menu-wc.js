'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">true</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-f3a31bf92980d6889d08740377bd96780862566e06739527ddebc7771316fe75b5dfc699859c5a93fd4ff322fc9d481c69bd2f87d7faa781a8108fdcd5838fdb"' : 'data-target="#xs-controllers-links-module-AppModule-f3a31bf92980d6889d08740377bd96780862566e06739527ddebc7771316fe75b5dfc699859c5a93fd4ff322fc9d481c69bd2f87d7faa781a8108fdcd5838fdb"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-f3a31bf92980d6889d08740377bd96780862566e06739527ddebc7771316fe75b5dfc699859c5a93fd4ff322fc9d481c69bd2f87d7faa781a8108fdcd5838fdb"' :
                                            'id="xs-controllers-links-module-AppModule-f3a31bf92980d6889d08740377bd96780862566e06739527ddebc7771316fe75b5dfc699859c5a93fd4ff322fc9d481c69bd2f87d7faa781a8108fdcd5838fdb"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-f3a31bf92980d6889d08740377bd96780862566e06739527ddebc7771316fe75b5dfc699859c5a93fd4ff322fc9d481c69bd2f87d7faa781a8108fdcd5838fdb"' : 'data-target="#xs-injectables-links-module-AppModule-f3a31bf92980d6889d08740377bd96780862566e06739527ddebc7771316fe75b5dfc699859c5a93fd4ff322fc9d481c69bd2f87d7faa781a8108fdcd5838fdb"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-f3a31bf92980d6889d08740377bd96780862566e06739527ddebc7771316fe75b5dfc699859c5a93fd4ff322fc9d481c69bd2f87d7faa781a8108fdcd5838fdb"' :
                                        'id="xs-injectables-links-module-AppModule-f3a31bf92980d6889d08740377bd96780862566e06739527ddebc7771316fe75b5dfc699859c5a93fd4ff322fc9d481c69bd2f87d7faa781a8108fdcd5838fdb"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CategoriesModule.html" data-type="entity-link" >CategoriesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-CategoriesModule-be97565e404b6e2adf25fa11cb01c4513f4055550ff83b801ccd57fc9ca2018296e849a84c5cf1f386446f89bf51f9a9868ece9293cca9dfcc750deae77e8339"' : 'data-target="#xs-controllers-links-module-CategoriesModule-be97565e404b6e2adf25fa11cb01c4513f4055550ff83b801ccd57fc9ca2018296e849a84c5cf1f386446f89bf51f9a9868ece9293cca9dfcc750deae77e8339"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CategoriesModule-be97565e404b6e2adf25fa11cb01c4513f4055550ff83b801ccd57fc9ca2018296e849a84c5cf1f386446f89bf51f9a9868ece9293cca9dfcc750deae77e8339"' :
                                            'id="xs-controllers-links-module-CategoriesModule-be97565e404b6e2adf25fa11cb01c4513f4055550ff83b801ccd57fc9ca2018296e849a84c5cf1f386446f89bf51f9a9868ece9293cca9dfcc750deae77e8339"' }>
                                            <li class="link">
                                                <a href="controllers/CategoriesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoriesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CategoriesModule-be97565e404b6e2adf25fa11cb01c4513f4055550ff83b801ccd57fc9ca2018296e849a84c5cf1f386446f89bf51f9a9868ece9293cca9dfcc750deae77e8339"' : 'data-target="#xs-injectables-links-module-CategoriesModule-be97565e404b6e2adf25fa11cb01c4513f4055550ff83b801ccd57fc9ca2018296e849a84c5cf1f386446f89bf51f9a9868ece9293cca9dfcc750deae77e8339"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CategoriesModule-be97565e404b6e2adf25fa11cb01c4513f4055550ff83b801ccd57fc9ca2018296e849a84c5cf1f386446f89bf51f9a9868ece9293cca9dfcc750deae77e8339"' :
                                        'id="xs-injectables-links-module-CategoriesModule-be97565e404b6e2adf25fa11cb01c4513f4055550ff83b801ccd57fc9ca2018296e849a84c5cf1f386446f89bf51f9a9868ece9293cca9dfcc750deae77e8339"' }>
                                        <li class="link">
                                            <a href="injectables/CategoryRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoryRepository</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductsModule.html" data-type="entity-link" >ProductsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ProductsModule-0e1360a7d29025799805b7fc2cd924829a09bc26f655f3ab9566d4221f9b33d79eaa1ac21401cdc15ce39e7a3e92222f383c052c89df8fe956cb2ec6ab733ee2"' : 'data-target="#xs-controllers-links-module-ProductsModule-0e1360a7d29025799805b7fc2cd924829a09bc26f655f3ab9566d4221f9b33d79eaa1ac21401cdc15ce39e7a3e92222f383c052c89df8fe956cb2ec6ab733ee2"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProductsModule-0e1360a7d29025799805b7fc2cd924829a09bc26f655f3ab9566d4221f9b33d79eaa1ac21401cdc15ce39e7a3e92222f383c052c89df8fe956cb2ec6ab733ee2"' :
                                            'id="xs-controllers-links-module-ProductsModule-0e1360a7d29025799805b7fc2cd924829a09bc26f655f3ab9566d4221f9b33d79eaa1ac21401cdc15ce39e7a3e92222f383c052c89df8fe956cb2ec6ab733ee2"' }>
                                            <li class="link">
                                                <a href="controllers/ProductsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductsController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UserModule-45e848d00b186bf30db984f4c64c016534833d1b5e2d159d780fabae267382da98548c5bca8a1be39fefdf89722b896f8e53f3f70cf2a736bc4d1accd84a21db"' : 'data-target="#xs-controllers-links-module-UserModule-45e848d00b186bf30db984f4c64c016534833d1b5e2d159d780fabae267382da98548c5bca8a1be39fefdf89722b896f8e53f3f70cf2a736bc4d1accd84a21db"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-45e848d00b186bf30db984f4c64c016534833d1b5e2d159d780fabae267382da98548c5bca8a1be39fefdf89722b896f8e53f3f70cf2a736bc4d1accd84a21db"' :
                                            'id="xs-controllers-links-module-UserModule-45e848d00b186bf30db984f4c64c016534833d1b5e2d159d780fabae267382da98548c5bca8a1be39fefdf89722b896f8e53f3f70cf2a736bc4d1accd84a21db"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UserModule-45e848d00b186bf30db984f4c64c016534833d1b5e2d159d780fabae267382da98548c5bca8a1be39fefdf89722b896f8e53f3f70cf2a736bc4d1accd84a21db"' : 'data-target="#xs-injectables-links-module-UserModule-45e848d00b186bf30db984f4c64c016534833d1b5e2d159d780fabae267382da98548c5bca8a1be39fefdf89722b896f8e53f3f70cf2a736bc4d1accd84a21db"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-45e848d00b186bf30db984f4c64c016534833d1b5e2d159d780fabae267382da98548c5bca8a1be39fefdf89722b896f8e53f3f70cf2a736bc4d1accd84a21db"' :
                                        'id="xs-injectables-links-module-UserModule-45e848d00b186bf30db984f4c64c016534833d1b5e2d159d780fabae267382da98548c5bca8a1be39fefdf89722b896f8e53f3f70cf2a736bc4d1accd84a21db"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#controllers-links"' :
                                'data-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CategoriesController.html" data-type="entity-link" >CategoriesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ProductsController.html" data-type="entity-link" >ProductsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UserController.html" data-type="entity-link" >UserController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#entities-links"' :
                                'data-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Category.html" data-type="entity-link" >Category</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Products.html" data-type="entity-link" >Products</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Profile.html" data-type="entity-link" >Profile</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CategoriesDTO.html" data-type="entity-link" >CategoriesDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/HttpExceptionFilter.html" data-type="entity-link" >HttpExceptionFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/NotNullException.html" data-type="entity-link" >NotNullException</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProductsDTO.html" data-type="entity-link" >ProductsDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/profileDTO.html" data-type="entity-link" >profileDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserDTO.html" data-type="entity-link" >UserDTO</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CategoriesService.html" data-type="entity-link" >CategoriesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CategoryRepository.html" data-type="entity-link" >CategoryRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductsService.html" data-type="entity-link" >ProductsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});