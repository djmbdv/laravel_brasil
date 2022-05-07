<?php
 
namespace App\Http\Controllers;
 
use App\Http\Controllers\Controller;
use App\Repository\DataConsultorRepository;

class DataController extends Controller
{
    /**
     * Show the profile for a given user.
     *
     * @param  int  $id
     * @return \Illuminate\View\View
     */
    protected $repository;

    function __construct() {
        parent::__construct();
        $this->repository = new DataConsultorRepository();
    }
    
    public function home()
    {
        return view("welcome");
    }
    public function usuarios()
    {   
        $users = $this->repository->get_usuarios();
        return response()->json($users);
    }
    public function clientes()
    {
        $c = $this->repository->get_clientes();
        return response()->json($c);
    }


    public function ranges(){
        $data = $this->repository->ranges();
        return $data;
    }
    public function bar($startDate, $endDate){
        $usuarios = request()->toArray();
        $data =  $this->repository->data_bar($usuarios,$startDate,$endDate);
        return $data;
    }

    
    public function pizza($startDate, $endDate){
        $usuarios = request()->toArray();
        $data =  $this->repository->data_pizza($usuarios,$startDate,$endDate);
        return $data;
    }

    public function data($user, $startDate, $endDate){
        $data = $this->repository->data_all($user,$startDate,$endDate);
        return $data;
    }
}