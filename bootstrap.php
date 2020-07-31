<?php
/*
 * This file is part of wulacms.
 *
 * (c) Leo Ning <windywany@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace demo;

use wula\cms\CmfModule;
use wulaphp\app\App;

class DemoModule extends CmfModule {
    public function getName() {
        return 'Demo Module';
    }

    public function menu(): array {
        $menu = [
            'demo' => [
                'name'  => '演示',
                'url'   => '#',
                'items' => [
                    'child1' => ['name' => '子菜单1', 'url' => 'demo/test1'],
                    'child2' => ['name' => '子菜单2', 'url' => 'demo/test2'],
                    'child3' => ['name' => '子菜单3', 'url' => 'demo'],
                ]
            ],
        ];

        return $menu;
    }
}

App::register(new DemoModule());