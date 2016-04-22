<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class CarTest extends TestCase
{
    use DatabaseTransactions;
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testExample()
    {
        $this->get('/car/add/1')->seeJsonStructure(['*'=>[]]);
        $this->get('/car/1')->seeJsonStructure(['id','name']);
        $this->get('car/delete/1')->see('1');
    }
}
