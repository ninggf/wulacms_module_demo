<?php
/*
 * This file is part of wulacms.
 *
 * (c) Leo Ning <windywany@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace demo\controllers;

use backend\classes\PjaxController;

class IndexController extends PjaxController {
    public function index() {
        return $this->vueComp('index',['compData'=>['name'=>'a"b"c\'','id'=>111,"list"=>[1,2,3]]] );
        
    }
}