<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ObstacleTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * A basic test example.
     *
     * @return void
     */
    public function testExample()
    {
        $response = $this->call('POST', '/obstacle', [
            'size' => rand(1, 10),
            'lat' => rand(0, 90),
            'lon' => rand(0, 360)
        ])->getContent();
        if($response>0){
            $this->assertTrue(true);
        }else{
            $this->assertTrue(false);
        }
        $this->delete('/obstacle/'.$response)->see('1');

    }
}
